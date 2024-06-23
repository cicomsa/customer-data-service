import WelcomeCustomerPage from '~/app/welcome/[customerId]/page';
import { render, screen, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { WelcomeCustomerData } from './types';

describe('Welcome page', () => {
  const mockCustomerId = '12345';
  const mockWelcomeCustomerData: WelcomeCustomerData = {
    title: 'Welcome customer',
    message: 'Your order is confirmed.',
    totalPrice: 100.5,
    freeGift: true,
  };

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('initially renders loading state', () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockWelcomeCustomerData) }),
    );
    waitFor(() =>
      render(<WelcomeCustomerPage params={{ customerId: mockCustomerId }} />),
    );

    const errorMessage = screen.queryByText(
      'Customer data not found for customerId',
    );

    expect(errorMessage).toBeNull();
  });

  test('displays error message when customer data is not found', async () => {
    fetchMock.mockReject(new Error('API error'));
    render(<WelcomeCustomerPage params={{ customerId: mockCustomerId }} />);

    const errorMessage = await screen.findByText(
      'Customer data not found for customerId 12345',
    );

    expect(errorMessage).toBeInTheDocument();
  });

  it('fetches and displays customer data correctly when present', async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockWelcomeCustomerData) }),
    );
    render(<WelcomeCustomerPage params={{ customerId: mockCustomerId }} />);

    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:8080/comms/your-next-delivery/${mockCustomerId}`,
      expect.any(Object),
    );

    const title = await screen.findByText(mockWelcomeCustomerData.title);
    const message = await screen.findByText(mockWelcomeCustomerData.message);
    const totalPrice = await screen.findByText(
      `Total price: £${mockWelcomeCustomerData.totalPrice.toFixed(2)}`,
    );

    const freeGift = await screen.findByAltText('FreeGift');

    expect(title).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(totalPrice).toBeInTheDocument();
    expect(freeGift).toBeInTheDocument();
  });

  test('renders correctly when no free gift is available', () => {
    const mockDataNoGift = { ...mockWelcomeCustomerData, freeGift: false };
    fetchMock.mockResponseOnce(
      JSON.stringify({ body: JSON.stringify(mockDataNoGift) }),
    );

    waitFor(() =>
      render(<WelcomeCustomerPage params={{ customerId: mockCustomerId }} />),
    );

    const freeGift = screen.queryByAltText('FreeGift');

    expect(freeGift).not.toBeInTheDocument();
  });
});
