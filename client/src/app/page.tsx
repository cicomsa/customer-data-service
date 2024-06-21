import * as customerData from './data.json';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.mainContainer}>
      <section className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.image} alt={'cat-image'} src={'/image.jpg'} />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{customerData.title}</h2>
          <p className={styles.message}>{customerData.message}</p>
          <p className={styles.totalPrice}>
            Total price: £{customerData.totalPrice.toFixed(2)}
          </p>
          <div className={styles.buttonsContainer}>
            <button type={'button'} className={styles.seeDetailsButton}>
              See details
            </button>
            <button type={'button'} className={styles.editDeliveryButton}>
              Edit delivery
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
