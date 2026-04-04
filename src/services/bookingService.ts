/**
 * Booking Service
 * Handles fetching and syncing prices from Booking.com
 * Note: Real-time syncing requires a Booking.com Partner API key.
 * This implementation provides a structure that can be easily connected to the official API.
 */

export interface RoomPrice {
  id: string;
  title: string;
  price: string;
  lastUpdated: string;
}

const DEFAULT_PRICES: RoomPrice[] = [
  { id: 'king', title: 'King Room', price: '8,500', lastUpdated: new Date().toISOString() },
  { id: 'royal', title: 'Royal Suite', price: '12,500', lastUpdated: new Date().toISOString() },
  { id: 'premium', title: 'Premium Suite', price: '10,500', lastUpdated: new Date().toISOString() },
  { id: 'swiss', title: 'Swiss Tents', price: '6,500', lastUpdated: new Date().toISOString() },
  { id: 'villa', title: 'Luxury Villa', price: '25,000', lastUpdated: new Date().toISOString() },
];

export const bookingService = {
  /**
   * Fetches the latest prices for all rooms.
   * In a production environment, this would call a backend API that integrates with Booking.com.
   */
  async fetchLatestPrices(): Promise<RoomPrice[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // If we had a Booking.com API key, we would perform a real fetch here:
    // const response = await fetch('https://api.booking.com/v1/hotels/prices?hotel_id=wabi-sabi-resort-nashik', {
    //   headers: { 'Authorization': `Bearer ${process.env.BOOKING_API_KEY}` }
    // });
    // return response.json();

    // For now, we return the default prices with a fresh timestamp to simulate a sync
    return DEFAULT_PRICES.map(p => ({
      ...p,
      lastUpdated: new Date().toISOString()
    }));
  }
};
