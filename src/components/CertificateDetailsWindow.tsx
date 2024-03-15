import React from 'react';
import styles from './styles/CertificateDetailsWindow.module.scss';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { CERElement } from 'asn1-ts';

type Props = {
  id: string,
};

export const CertificateDetailsWindow: React.FC<Props> = ({id}) => {
  const {certificates} = useAppSelector(state => state.certificates);
  const certificate = certificates.find((certificate) => certificate.id === id);
  const dateFormatChanger = (date: Date): string => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  };

  if (!certificate) {
    return null;
  }
  const uint8Array = new Uint8Array(certificate.data);
  const certificateData = new CERElement();
  certificateData.fromBytes(uint8Array);
  const toDate = dateFormatChanger(certificateData.sequence[0].sequence[4].setOf[1].utcTime);
  const fromDate = dateFormatChanger(certificateData.sequence[0].sequence[4].setOf[0].utcTime);
  const issuerName = certificateData.sequence[0].sequence[3].setOf[1].sequence[0].setOf[1].utf8String;

  return (
    <div className={styles.fileDetailsContainer}>
      <span><b>Common name:</b> {certificate?.fullName}</span>
      <span><b>Issuer CN:</b> {issuerName}</span>
      <span><b>Valid From:</b> {fromDate}</span>
      <span><b>Valid To:</b> {toDate}</span>
    </div>
  );
};
