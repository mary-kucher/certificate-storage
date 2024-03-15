import React from 'react';
import { ICertificate } from '../types/ICertificate.ts';
import styles from './styles/ListOfCertificates.module.scss';
import { ArrowIcon } from './ArrowIcon.tsx';

type Props = {
  certificates: ICertificate[],
  handleCertOpen: (id: string) => void
};

export const ListOfCertificates: React.FC<Props> = ({certificates, handleCertOpen}) => {
  return (
    <ul>
      {certificates.map((certificate) => (
        <li className={styles.cert} key={certificate.id} onClick={() => handleCertOpen(certificate.id)}>
          <p>{certificate.fullName}</p>
          <div className={styles.btn}>
            <ArrowIcon/>
          </div>
        </li>
      ))}
    </ul>
  );
};
