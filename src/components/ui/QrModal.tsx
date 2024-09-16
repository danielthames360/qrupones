'use client';
import QRCode from 'react-qr-code';

interface QrModalProps {
  onClose: () => void;
  qrCode: string;
}

export const QrModal = (props: QrModalProps) => {
  const { onClose, qrCode } = props;
  return (
    <div className='relative z-[9999] transition-all duration-100' aria-labelledby='modal-title' role='dialog' aria-modal='true'>
      <div className='fixed inset-0 bg-black bg-opacity-85 transition-opacity' aria-hidden='true'></div>
      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
          <div className='relative transform overflow-hidden rounded-2xl bg-slate-50 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl p-5'>
            <div className='px-20 py-10 flex flex-col justify-center items-center gap-10'>
              <QRCode
                size={200}
                style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                value={qrCode}
                viewBox={'0 0 256 256'}
              />
              <p>
                <b>Código:</b> {qrCode}
              </p>
              <button
                type='button'
                onClick={onClose}
                className='button bg-gradient-to-r from-[#616161] to-[#272727] py-4 px-5 rounded-xl button-coupons text-2xl'>
                Confirmar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
