import { useContext } from 'react';
import { ToastContext } from '../App.jsx';

export default function Toast() {
  const { toast } = useContext(ToastContext);
  return (
    <div className={`toast${toast.visible ? ' show' : ''}`}>
      {toast.message}
    </div>
  );
}
