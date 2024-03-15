import { useState } from 'react';
import { CERElement } from 'asn1-ts';
import { useAppSelector } from '../hooks/useAppSelector.ts';
import { useAppDispatch } from '../hooks/useAppDispatch.ts';
import { addCertificate } from '../reducers/certSlice.ts';
import { ICertificate } from '../types/ICertificate.ts';
import styles from './styles/App.module.scss';
import { AddButton } from './AddButton.tsx';
import { ListOfCertificates } from './ListOfCertificates.tsx';
import { CertificateLoadWindow } from './CertificateLoadWindow.tsx';
import { CertificateDetailsWindow } from './CertificateDetailsWindow.tsx';

export const App = () => {
  const [isAddNewCert, setIsAddNewCert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [detailsWindow, setDetailsWindow] = useState({
    isOpen: false,
    id: '',
  });
  const {certificates} = useAppSelector(state => state.certificates);
  const dispatch = useAppDispatch();

  const decodeCertificate = (cert: ArrayBuffer) => {
    const uint8Array = new Uint8Array(cert);
    const cerElement = new CERElement();
    try {
      cerElement.fromBytes(uint8Array);
      cerElement.sequence
    } catch (e) {
      setErrorMessage('Неправильна структура конверта сертифіката (очікується SEQUENCE)');
      return null;
    }
    return cerElement;
  }
  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const arrayBuffer = reader.result as ArrayBuffer;
      const decodedData = decodeCertificate(arrayBuffer);
      if (!decodedData) {
        return;
      }
      const fullName = decodedData.sequence[0].sequence[5].setOf[1].sequence[0].setOf[1].utf8String;
      const cert: ICertificate = {
        fullName: fullName,
        id: decodedData.sequence[0].sequence[1].utf8String,
        data: Array.from(new Uint8Array(arrayBuffer)),
      };
      dispatch(addCertificate(cert));
    };
    reader.readAsArrayBuffer(file);
    setIsAddNewCert(false);
  };

  const handleOpenUploadWindow = () => {
    setIsAddNewCert(prevState => !prevState);
    setDetailsWindow({
      isOpen: false,
      id: '',
    });
    setErrorMessage('');
  }
  const handleCertOpen = (id: string) => {
    setErrorMessage('');
    setIsAddNewCert(false);
    setDetailsWindow(prevState => {
      return {
        isOpen: prevState.id !== id || !prevState.isOpen,
        id: id,
      };
    });
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <AddButton isAdd={isAddNewCert} setIsAdd={handleOpenUploadWindow}/>
        {certificates.length > 0
          ? <ListOfCertificates certificates={certificates} handleCertOpen={handleCertOpen}/>
          : (<span>Сертифікати відсутні</span>)
        }
      </div>
      <div className={styles.rightWindow}>
        {isAddNewCert && !detailsWindow.isOpen && <CertificateLoadWindow onFileSelect={handleFileUpload}/>}
        {detailsWindow.isOpen && <CertificateDetailsWindow id={detailsWindow.id}/>}
        {!!errorMessage.length && <span className={styles.errorMessage}>{errorMessage}</span>}
      </div>
    </div>
  )
}
