// Period tracking utility functions
export class PeriodTracker {
  /**
   * Calculate cycle lengths between consecutive logged periods
   * @param {string[]} periodDates - Array of period start dates in YYYY-MM-DD format
   * @returns {number[]} Array of cycle lengths in days
   */
  static calculateCycleLengths(periodDates) {
    if (periodDates.length < 2) return [];
    
    const sortedDates = periodDates
      .map(date => new Date(date))
      .sort((a, b) => a - b);
    
    const cycleLengths = [];
    for (let i = 1; i < sortedDates.length; i++) {
      const diffTime = sortedDates[i] - sortedDates[i - 1];
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Only include realistic cycle lengths (21-35 days)
      if (diffDays >= 21 && diffDays <= 35) {
        cycleLengths.push(diffDays);
      }
    }
    
    return cycleLengths;
  }

  /**
   * Calculate average cycle length from logged periods
   * @param {string[]} periodDates - Array of period start dates
   * @returns {number} Average cycle length in days (defaults to 28)
   */
  static getAverageCycleLength(periodDates) {
    const cycleLengths = this.calculateCycleLengths(periodDates);
    
    if (cycleLengths.length === 0) {
      return 28; // Default cycle length
    }
    
    const sum = cycleLengths.reduce((acc, length) => acc + length, 0);
    return Math.round(sum / cycleLengths.length);
  }

  /**
   * Predict the next period start date
   * @param {string[]} periodDates - Array of period start dates
   * @returns {Date|null} Predicted next period start date or null if insufficient data
   */
  static predictNextPeriod(periodDates) {
    if (periodDates.length === 0) return null;
    
    // Get most recent logged period
    const sortedDates = [...periodDates].sort();
    const lastPeriod = sortedDates[sortedDates.length - 1];
    const avgCycle = this.getAverageCycleLength(periodDates);
    
    // Calculate next period start date
    const lastPeriodDate = new Date(lastPeriod);
    const nextPeriodDate = new Date(lastPeriodDate.getTime() + (avgCycle * 24 * 60 * 60 * 1000));
    
    return nextPeriodDate;
  }

  /**
   * Get all predicted period dates (7-day windows for multiple cycles)
   * @param {string[]} periodDates - Array of logged period start dates
   * @param {number} cyclesAhead - Number of future cycles to predict (default: 6)
   * @returns {string[]} Array of predicted period dates in YYYY-MM-DD format
   */
  static getPredictedPeriodDates(periodDates, cyclesAhead = 6) {
    // Skip prediction if insufficient data
    if (periodDates.length === 0) return [];
    
    const avgCycle = this.getAverageCycleLength(periodDates);
    const sortedDates = [...periodDates].sort();
    const lastPeriod = sortedDates[sortedDates.length - 1];
    
    const allPredictedDates = [];
    let currentPeriodStart = lastPeriod;
    
    // Generate predictions for multiple cycles ahead
    for (let cycle = 1; cycle <= cyclesAhead; cycle++) {
      // Calculate next period start date
      const lastDate = new Date(currentPeriodStart);
      const nextDate = new Date(lastDate.getTime() + (avgCycle * 24 * 60 * 60 * 1000));
      currentPeriodStart = nextDate.toISOString().split('T')[0];
      
      // Add 7-day period window
      for (let day = 0; day < 7; day++) {
        const periodDate = new Date(nextDate.getTime() + (day * 24 * 60 * 60 * 1000));
        allPredictedDates.push(periodDate.toISOString().split('T')[0]);
      }
    }
    
    return allPredictedDates;
  }

  /**
   * Get all logged period dates (including 7-day period windows)
   * @param {string[]} periodDates - Array of logged period start dates
   * @returns {string[]} Array of all period dates (start + 6 following days for each)
   */
  static getAllPeriodDates(periodDates) {
    const allPeriodDates = [];
    
    periodDates.forEach(startDate => {
      // Add 7 days for each logged period (start date + 6 following days)
      for (let i = 0; i < 7; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        allPeriodDates.push(date.toISOString().split('T')[0]);
      }
    });
    
    return allPeriodDates;
  }

  /**
   * Get cycle regularity status
   * @param {string[]} periodDates - Array of period start dates
   * @returns {string} Regularity status: 'Regular', 'Irregular', or 'Not enough data'
   */
  static getCycleRegularity(periodDates) {
    const cycleLengths = this.calculateCycleLengths(periodDates);
    
    if (cycleLengths.length < 2) {
      return 'Not enough data';
    }
    
    const variation = Math.max(...cycleLengths) - Math.min(...cycleLengths);
    return variation <= 5 ? 'Regular' : 'Irregular';
  }

  /**
   * Get cycle message for current month
   * @param {string[]} periodDates - Array of period start dates
   * @returns {string} Message about current cycle timing
   */
  static getCycleMessage(periodDates) {
    if (periodDates.length < 3) return '';
    
    const cycleLengths = this.calculateCycleLengths(periodDates);
    const avgCycle = this.getAverageCycleLength(periodDates);
    const lastCycle = cycleLengths[cycleLengths.length - 1];
    
    if (!lastCycle) return '';
    
    const difference = lastCycle - avgCycle;
    
    if (Math.abs(difference) <= 2) {
      return 'Your cycle is regular this month.';
    } else if (difference > 2) {
      return `Your cycle is ${difference} days late this month.`;
    } else {
      return `Your cycle is ${Math.abs(difference)} days early this month.`;
    }
  }
} 