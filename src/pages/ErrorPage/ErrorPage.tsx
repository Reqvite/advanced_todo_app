import {ReactElement} from 'react';

export const ErrorPage = (): ReactElement => {
  const reloadPage = () => {
    location.reload();
    localStorage.clear();
  };

  return (
    <div>
      An unexpected error occurred.
      <button onClick={reloadPage}>Reload page</button>
    </div>
  );
};
