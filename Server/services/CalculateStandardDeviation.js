//Task 3
export const calculateStandardDeviation =async (prices) => {
    // Check if data is available
    if (prices.length === 0) {
      return res.status(404).json({ error: 'No data found for the requested cryptocurrency.' });
    }

    // Calculate mean (average)
    const mean =await prices.reduce((sum, price) => sum + price, 0) / prices.length;

    // Calculate variance
    const variance = await prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / prices.length;

    // Calculate standard deviation
    const standardDeviation = Math.sqrt(variance);

    return standardDeviation;
}