import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="error">
      잘못된 접근입니다.
      <Link to="/">홈으로 돌아가기</Link>
    </div>
  );
}

export default NotFound;
