import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>소프트웨어공학 12팀</h1>
        <table>
          <tr>
            <th>학번</th>
            <th>이름</th>
          </tr>
          <tr>
            <td>15109316</td>
            <td>김성태</td>
          </tr>
          <tr>
            <td>16102203</td>
            <td>위성률</td>
          </tr>
          <tr>
            <td>18101229</td>
            <td>신현규</td>
          </tr>
          <tr>
            <td>18101281</td>
            <td>최해솔</td>
          </tr>
        </table>
        <a className="App-link" href="https://github.com/md2eoseo/se12-front" target="_blank" rel="noopener noreferrer">
          Frontend
        </a>
        <a className="App-link" href="https://github.com/md2eoseo/se12-back" target="_blank" rel="noopener noreferrer">
          Backend
        </a>
      </header>
    </div>
  );
}

export default App;
