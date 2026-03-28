// tests/api/hotels.spec.ts
import { test, expect } from '@playwright/test';

test.describe.skip('Hotels API', () => {
  
  test('deve buscar hotéis por cidade', async ({ request }) => {
    const response = await request.get('https://api.simplenight.com/v1/hotels', {
      params: {
        city: 'New York',
        checkIn: '2026-11-20',
        checkOut: '2026-11-22',
      },
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    
    expect(data.hotels).toBeInstanceOf(Array);
    expect(data.hotels.length).toBeGreaterThan(0);
    expect(data.hotels[0]).toHaveProperty('id');
    expect(data.hotels[0]).toHaveProperty('name');
  });

  test('deve criar reserva', async ({ request }) => {
    const response = await request.post('https://api.simplenight.com/v1/bookings', {
      data: {
        hotelId: 'hotel_123',
        checkIn: '2026-11-20',
        checkOut: '2026-11-22',
        guests: 2,
      },
      headers: {
        'Authorization': `Bearer ${process.env.API_TOKEN}`,
      },
    });

    expect(response.status()).toBe(201);
    const booking = await response.json();
    expect(booking.id).toBeDefined();
  });
});