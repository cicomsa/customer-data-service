'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { CustomerData } from '~/app/welcome/[customerId]/types';

interface Route {
  params: Record<'customerId', string>;
}

export default function Welcome(route: Route) {
  const customerId = route.params.customerId;
  const [customerData, setCustomerData] = useState<CustomerData | undefined>(
    undefined,
  );

  useEffect(() => {
    fetch(`http://localhost:8080/comms/your-next-delivery/${customerId}`, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
      .then(async (res) => {
        const response = await res.json();

        setCustomerData(JSON.parse(response.body));
      })
      .catch(console.error);
  }, [customerId]);

  if (!customerData)
    return <p>Customer data not found for customerId {customerId}</p>;

  return (
    <main className={styles.mainContainer}>
      <section className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.image} alt={'cat-image'} src={'/image.jpg'} />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{customerData.title}</h3>
          <p className={styles.message}>{customerData.message}</p>
          <p className={styles.totalPrice}>
            Total price: £{customerData.totalPrice.toFixed(2)}
          </p>
          <div className={styles.buttonsContainer}>
            <button type="button" className={styles.seeDetailsButton}>
              See details
            </button>
            <button type="button" className={styles.editDeliveryButton}>
              Edit delivery
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
