import Welcome from '~/app/welcome/[customerId]/page';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { CustomerData } from './types';

describe('Welcome page', () => {
  const mockCustomerId = '12345';
  const mockCustomerData: CustomerData = {
    title: 'Welcome',
    message: 'Your order is confirmed.',
    totalPrice: 100.5,
    freeGift: true,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('initially renders loading state', () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockCustomerData) }),
    );
    waitFor(() => render(<Welcome params={{ customerId: mockCustomerId }} />));

    const errorMessage = screen.queryByText(
      'Customer data not found for customerId',
    );

    expect(errorMessage).toBeNull();
  });

  test('displays error message when customer data is not found', async () => {
    fetchMock.mockReject(new Error('API error'));
    render(<Welcome params={{ customerId: mockCustomerId }} />);

    const errorMessage = await screen.findByText(
      'Customer data not found for customerId 12345',
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('fetches and displays customer data correctly when present', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockCustomerData) }),
    );
    render(<Welcome params={{ customerId: mockCustomerId }} />);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8080/comms/your-next-delivery/${mockCustomerId}`,
      expect.any(Object),
    );

    const title = await screen.findByText(mockCustomerData.title);
    const message = await screen.findByText(mockCustomerData.message);
    const totalPrice = await screen.findByText(
      `Total price: £${mockCustomerData.totalPrice.toFixed(2)}`,
    );

    const freeGift = await screen.findByAltText('FreeGift');

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(freeGift).toBeInTheDocument();
  });

  test('renders correctly when no free gift is available', () => {
    const mockDataNoGift = { ...mockCustomerData, freeGift: false };
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockDataNoGift) }),
    );

    waitFor(() => render(<Welcome params={{ customerId: mockCustomerId }} />));

    const freeGift = screen.queryByAltText('FreeGift');

    expect(freeGift).not.toBeInTheDocument();
  });
});
