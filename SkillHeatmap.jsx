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

