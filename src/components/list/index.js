export default function List({ list }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th className="title">No.</th>
          <th className="title">お名前</th>
          <th className="title">生年月日</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item, index) => {
          return (
            <tr key={item.id}>
              <td className="item">{index + 1}</td>
              <td className="item">{item.name}</td>
              <td className="item">{item.birth}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
