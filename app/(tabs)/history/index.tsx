import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
} from 'react-native';

import Animated from 'react-native-reanimated';

import { Ionicons } from '@expo/vector-icons';

import { COLORS, SIZES } from '@/constants';

type TransactionType = 'earn' | 'spend';

interface PointTransaction {
  id: string;
  date: string;
  location: string;
  amount: number;
  points: number;
  type: TransactionType;
}

const MOCK_HISTORY: PointTransaction[] = [
  {
    id: '1',
    date: '2026-05-28T20:15:00',
    location: 'Burni Billiards Hà Nội',
    amount: 450000,
    points: 45,
    type: 'earn',
  },
  {
    id: '2',
    date: '2026-05-24T19:30:00',
    location: 'Burni Billiards Hà Nội',
    amount: 320000,
    points: 32,
    type: 'earn',
  },
  {
    id: '3',
    date: '2026-05-20T18:00:00',
    location: 'Đổi Voucher Nước',
    amount: 0,
    points: 50,
    type: 'spend',
  },
  {
    id: '4',
    date: '2026-04-14T21:00:00',
    location: 'Burni Billiards Hà Nội',
    amount: 620000,
    points: 62,
    type: 'earn',
  },
  {
    id: '5',
    date: '2026-04-01T17:15:00',
    location: 'Burni Billiards Hà Nội',
    amount: 280000,
    points: 28,
    type: 'earn',
  },
];

const formatCurrency = (value: number) => {
  return value.toLocaleString('vi-VN');
};

const formatMonthGroup = (dateString: string) => {
  const date = new Date(dateString);

  return `${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  return `${String(date.getDate()).padStart(2, '0')}/${String(
    date.getMonth() + 1
  ).padStart(2, '0')}/${date.getFullYear()} ${String(
    date.getHours()
  ).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
};

export default function HistoryPage() {
  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState<
    'all' | 'earn' | 'spend'
  >('all');

  const onRefresh = async () => {
    setRefreshing(true);

    await new Promise(resolve =>
      setTimeout(resolve, 1000)
    );

    setRefreshing(false);
  };

  const filteredTransactions = useMemo(() => {
    if (filter === 'all') {
      return MOCK_HISTORY;
    }

    return MOCK_HISTORY.filter(
      item => item.type === filter
    );
  }, [filter]);

  const groupedTransactions = useMemo(() => {
    const groups: Record<
      string,
      PointTransaction[]
    > = {};

    filteredTransactions.forEach(item => {
      const key = formatMonthGroup(item.date);

      if (!groups[key]) {
        groups[key] = [];
      }

      groups[key].push(item);
    });

    return Object.entries(groups);
  }, [filteredTransactions]);

  const totalPoints = MOCK_HISTORY.reduce(
    (acc, curr) =>
      curr.type === 'earn'
        ? acc + curr.points
        : acc - curr.points,
    0
  );

  return (
    <Animated.ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 120,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      <Text style={styles.title}>
        Lịch Sử Điểm
      </Text>

      <Text style={styles.availablePoints}>
        Điểm hiện có:{' '}
        <Text style={styles.bold}>
          {totalPoints}
        </Text>
      </Text>

      <Text style={styles.filterTitle}>
        Loại giao dịch
      </Text>

      <View style={styles.filterRow}>
        <FilterChip
          label="Tất cả"
          active={filter === 'all'}
          onPress={() => setFilter('all')}
        />

        <FilterChip
          label="Tích điểm"
          active={filter === 'earn'}
          onPress={() => setFilter('earn')}
        />

        <FilterChip
          label="Sử dụng điểm"
          active={filter === 'spend'}
          onPress={() => setFilter('spend')}
        />
      </View>

      {groupedTransactions.map(
        ([month, transactions]) => (
          <View
            key={month}
            style={styles.section}
          >
            <Text style={styles.monthTitle}>
              {month}
            </Text>

            {transactions.map(item => (
              <View
                key={item.id}
                style={styles.card}
              >
                <View
                  style={styles.cardHeader}
                >
                  <Text
                    style={styles.date}
                  >
                    {formatDate(item.date)}
                  </Text>

                  <Ionicons
                    name={
                      item.type === 'earn'
                        ? 'arrow-down-circle'
                        : 'gift-outline'
                    }
                    size={22}
                    color={
                      item.type === 'earn'
                        ? COLORS.secondary
                        : COLORS.primary
                    }
                  />
                </View>

                <Text
                  style={styles.location}
                >
                  {item.location}
                </Text>

                <View
                  style={styles.bottomRow}
                >
                  <Text
                    style={styles.amount}
                  >
                    {item.amount > 0
                      ? `${formatCurrency(
                          item.amount
                        )}đ`
                      : 'Đổi quà'}
                  </Text>

                  <Text
                    style={[
                      styles.points,
                      item.type === 'earn'
                        ? styles.positive
                        : styles.negative,
                    ]}
                  >
                    {item.type === 'earn'
                      ? `+${item.points}`
                      : `-${item.points}`}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )
      )}
    </Animated.ScrollView>
  );
}

function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Text
      onPress={onPress}
      style={[
        styles.chip,
        active && styles.chipActive,
      ]}
    >
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#222',
    marginTop: 24,
  },

  availablePoints: {
    marginTop: 8,
    fontSize: 18,
    color: '#666',
  },

  bold: {
    fontWeight: '700',
    color: COLORS.secondary,
  },

  filterTitle: {
    marginTop: 30,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },

  filterRow: {
    flexDirection: 'row',
    gap: 12,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#fff',
    overflow: 'hidden',
    color: '#444',
  },

  chipActive: {
    backgroundColor: COLORS.icedorange,
    color: '#fff',
  },

  section: {
    marginTop: 30,
  },

  monthTitle: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
    color: '#222',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,

    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  date: {
    color: '#888',
    fontSize: 14,
  },

  location: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },

  bottomRow: {
    marginTop: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  amount: {
    fontSize: 18,
    fontWeight: '600',
  },

  points: {
    fontSize: 22,
    fontWeight: '700',
  },

  positive: {
    color: '#2EAD61',
  },

  negative: {
    color: '#D9534F',
  },
});