import { Paper, Title, Badge } from '@mantine/core';

export default function Leaderboard({ rankings }) {
  return (
    <Paper shadow="sm" radius="md" p="md" withBorder style={{ background: "rgba(255,255,255,0.95)" }}>
      <Title order={3} mb="sm">🏆 Leaderboard</Title>
      <table className="excel-table">
  <thead>
    <tr>
      <th>Rank</th>
      <th>Name</th>
      <th>Total Score</th>
    </tr>
  </thead>
  <tbody>
    {rankings.map((r, i) => (
      <tr key={r.id}>
        <td>{i + 1}</td>
        <td>{r.name}</td>
        <td>
          <span style={{
            backgroundColor: r.total_score >= 22 ? '#d4edda' : '#f8d7da',
            color: '#333',
            padding: '4px 8px',
            borderRadius: '4px',
            display: 'inline-block'
          }}>
            {r.total_score}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </Paper>
  );
}
