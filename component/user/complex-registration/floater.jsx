import classNames from 'classnames';

export const Floater = ({ registered, setRegistered }) => {
  const sign = registered ? '+' : '-';
  const name = !registered ? 'Register' : 'Login';

  return (
    <div
      className={classNames(
        'hidden',
        'md:flex',
        'absolute',
        'items-center',
        'justify-center',
        'bg-blue-400',
        'ease-out',
        'cursor-pointer',
        'duration-500',
        'transition-all',
        'floater',
        {
          'rounded-r': registered,
          'rounded-l': !registered,
        },
      )}
      onClick={() => setRegistered(!registered)}
    >
      <div className="text-white font-bold text-lg">{name}</div>
      <style jsx>
        {`
          .floater {
            top: 50%;
            left: 50%;
            width: 150px;
            height: 300px;
            transform: translate(calc(-50% ${sign} 265px), -50%);
          }
          .floater:hover {
            transform: translate(calc(-50% ${sign} 275px), -50%);
          }
        `}
      </style>
    </div>
  );
};
