'use client';

import styles from './page.module.css';
import { useEffect, useState } from 'react';
import { CustomerData } from '~/app/welcome/[customerId]/types';

interface Route {
  params: Record<'customerId', string>;
}

export default function Welcome(route: Route) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [customerId]);

  if (isLoading) return;

  if (!customerData)
    return <p>Customer data not found for customerId {customerId}</p>;

  return (
    <main className={styles.mainContainer}>
      <section className={styles.card}>
        <div className={styles.imageContainer}>
          <img className={styles.catImage} alt={'Cat'} src={'/cat.jpg'} />
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
          {customerData.freeGift && (
            <img
              className={styles.freeGiftImage}
              alt={'FreeGift'}
              src={'/free-gift.jpg'}
              width={100}
              height={100}
            />
          )}
        </div>
      </section>
    </main>
  );
}
