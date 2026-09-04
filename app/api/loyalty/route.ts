import { getSql } from '@/lib/db';
import type { LoyaltyAccount, LoyaltyReward, LoyaltyTransaction } from '@/types';

type AccountRow = {
  id: string;
  user_name: string;
  user_email: string;
  points: number;
  tier: string;
  next_tier_points: number;
  total_saved: number;
  referral_code: string;
  referral_link: string;
  referral_count: number;
  referral_points_earned: number;
};

type TxRow = {
  id: string;
  account_id: string;
  date: string;
  description: string;
  points: number;
  type: string;
};

type RewardRow = {
  id: string;
  title: string;
  points_required: number;
  discount_value: number;
  description: string;
  type: string;
  badge: string | null;
};

const ACCOUNT_ID = 'account-01';

function tierFor(points: number): 'Bronze' | 'Silver' | 'Gold' | 'Platinum' {
  if (points >= 3000) return 'Platinum';
  if (points >= 1500) return 'Gold';
  if (points >= 500) return 'Silver';
  return 'Bronze';
}

function nextTierFor(points: number): number {
  if (points >= 3000) return 3000;
  if (points >= 1500) return 3000;
  if (points >= 500) return 1500;
  return 500;
}

async function getTransactions(): Promise<LoyaltyTransaction[]> {
  const txRows = (await getSql()`
    SELECT * FROM loyalty_transactions WHERE account_id = ${ACCOUNT_ID}
    ORDER BY id DESC
  `) as unknown as TxRow[];
  return txRows.map((t) => ({
    id: t.id,
    date: t.date,
    description: t.description,
    points: t.points,
    type: t.type as 'credit' | 'debit'
  }));
}

function rewardFromRow(r: RewardRow): LoyaltyReward {
  return {
    id: r.id,
    title: r.title,
    pointsRequired: r.points_required,
    discountValue: r.discount_value,
    description: r.description,
    type: r.type as LoyaltyReward['type'],
    badge: r.badge ?? undefined
  };
}

export async function GET() {
  try {
    const acctRows = (await getSql()`
      SELECT * FROM loyalty_accounts WHERE id = ${ACCOUNT_ID}
    `) as unknown as AccountRow[];

    const rewardRows = (await getSql()`
      SELECT * FROM loyalty_rewards ORDER BY points_required ASC
    `) as unknown as RewardRow[];

    let account: LoyaltyAccount | null = null;
    if (acctRows.length > 0) {
      const a = acctRows[0];
      const transactions = await getTransactions();
      account = {
        userId: a.id,
        userName: a.user_name,
        userEmail: a.user_email,
        points: a.points,
        tier: a.tier as LoyaltyAccount['tier'],
        nextTierPoints: a.next_tier_points,
        totalSaved: a.total_saved,
        referralCode: a.referral_code,
        referralLink: a.referral_link,
        referralCount: a.referral_count,
        referralPointsEarned: a.referral_points_earned,
        transactions
      };
    }

    return Response.json({
      account,
      rewards: rewardRows.map(rewardFromRow)
    });
  } catch (e) {
    console.error('GET /api/loyalty error:', e);
    return Response.json({ error: 'Erro ao buscar fidelidade' }, { status: 500 });
  }
}

async function addPoints(points: number, description: string): Promise<LoyaltyAccount> {
  const acctRows = (await getSql()`
    SELECT * FROM loyalty_accounts WHERE id = ${ACCOUNT_ID}
  `) as unknown as AccountRow[];
  const a = acctRows[0];
  const newPoints = Math.max(0, a.points + points);
  const newTier = tierFor(newPoints);
  const newNext = nextTierFor(newPoints);
  const txId = `tx-${Date.now()}`;
  const dateStr = new Date().toLocaleDateString('pt-BR');

  await getSql()`
    UPDATE loyalty_accounts SET points = ${newPoints}, tier = ${newTier},
      next_tier_points = ${newNext}
    WHERE id = ${ACCOUNT_ID}
  `;
  await getSql()`
    INSERT INTO loyalty_transactions (id, account_id, date, description, points, type)
    VALUES (${txId}, ${ACCOUNT_ID}, ${dateStr}, ${description}, ${points},
      ${points >= 0 ? 'credit' : 'debit'})
  `;

  const storedTx = (await getSql()`
    SELECT * FROM loyalty_transactions WHERE account_id = ${ACCOUNT_ID}
    ORDER BY id DESC
  `) as unknown as TxRow[];
  const transactions = storedTx.map((t) => ({
    id: t.id,
    date: t.date,
    description: t.description,
    points: t.points,
    type: t.type as 'credit' | 'debit'
  }));

  return {
    userId: a.id,
    userName: a.user_name,
    userEmail: a.user_email,
    points: newPoints,
    tier: newTier,
    nextTierPoints: newNext,
    totalSaved: a.total_saved,
    referralCode: a.referral_code,
    referralLink: a.referral_link,
    referralCount: a.referral_count,
    referralPointsEarned: a.referral_points_earned,
    transactions
  };
}

export async function POST(req: Request) {
  let body: { action?: string; points?: number; description?: string; rewardId?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 });
  }

  try {
    if (body.action === 'points') {
      const points = Number(body.points) || 0;
      const account = await addPoints(points, body.description || 'Ajuste de pontos');
      return Response.json({ account });
    }

    if (body.action === 'redeem') {
      const rewardId = body.rewardId;
      const rewardRows = (await getSql()`
        SELECT * FROM loyalty_rewards WHERE id = ${rewardId}
      `) as unknown as RewardRow[];
      if (rewardRows.length === 0) {
        return Response.json({ error: 'Recompensa não encontrada' }, { status: 404 });
      }
      const reward = rewardRows[0];
      const acctRows = (await getSql()`
        SELECT points FROM loyalty_accounts WHERE id = ${ACCOUNT_ID}
      `) as unknown as { points: number }[];
      const points = acctRows[0].points;
      if (points < reward.points_required) {
        return Response.json(
          { error: 'Saldo insuficiente', required: reward.points_required },
          { status: 400 }
        );
      }
      const account = await addPoints(
        -reward.points_required,
        `Resgate de benefício: ${reward.title}`
      );
      return Response.json({ account });
    }

    return Response.json({ error: 'Ação inválida' }, { status: 400 });
  } catch (e) {
    console.error('POST /api/loyalty error:', e);
    return Response.json({ error: 'Erro ao processar fidelidade' }, { status: 500 });
  }
}
