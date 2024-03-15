import styles from './styles/ListOfCertificates.module.scss';

export const ArrowIcon = () => {
  return (
    <svg
      className={styles.icon}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="m14.707 11.293-4-4A1 1 0 0 0 9 8v8a1 1 0 0 0 1.707.707l4-4a1 1 0 0 0 0-1.414z"
        style={{fill: '#646cff'}}
        data-name="Right"
      />
    </svg>
  );
};
