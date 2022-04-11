import { useEffect, useState } from 'react';
import styles from './css/Message.module.css'

const Message = ({type, msg}) => {

  const [visible, setvisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setvisible(false)
      return
    }

    setvisible(true)

    const timer = setTimeout(() => setvisible(false), 3000)

    return () => clearTimeout(timer)
  }, [msg])

  return (
    <>
    {visible && (
      <div className={`${styles.message} ${styles[type]}`}>{msg}</div>
    )}
    </>
  );
}
 
export default Message;