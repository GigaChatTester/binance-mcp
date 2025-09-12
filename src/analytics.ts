// analytics.ts
// Пример функции расширенной аналитики данных для проекта binance-mcp

import { Trade, Portfolio } from './types';

/**
 * Аналитическая функция: рассчитывает ключевые метрики по портфелю
 * и анализирует эффективность торговых операций пользователя.
 *
 * @param trades - массив торговых операций пользователя
 * @param portfolio - текущее состояние портфеля
 * @returns сводная статистика по метрикам эффективности
 */
export function analyzePortfolioPerformance(trades: Trade[], portfolio: Portfolio) {
    // Пример метрик: общий объём торгов, прибыль/убыток (PnL), средний размер сделки, число сделок
    let totalVolume = 0;
    let totalPnL = 0;
    let tradeCount = trades.length;

    for (const trade of trades) {
        totalVolume += Math.abs(trade.quoteQty);
        totalPnL += trade.realizedPnL;
    }

    const avgTradeSize = tradeCount > 0 ? totalVolume / tradeCount : 0;
    const roi = portfolio.initialValue > 0 ? ((portfolio.currentValue - portfolio.initialValue) / portfolio.initialValue) * 100 : 0;

    return {
        totalVolume,
        totalPnL,
        avgTradeSize,
        tradeCount,
        roi, // Return on Investment in %
        assetDistribution: portfolio.assets
    };
}

// Пример типизации. В реальном проекте их лучше расширить и вынести в отдельный модуль
type AssetInfo = {
    symbol: string;
    amount: number;
    currentPrice: number;
};

export type Portfolio = {
    assets: AssetInfo[];    // Распределение активов
    initialValue: number;   // Стоимость портфеля на момент старта аналитики
    currentValue: number;   // Актуальная стоимость портфеля
};

export type Trade = {
    symbol: string;
    quoteQty: number;       // Сумма сделки в валюте котировки
    realizedPnL: number;    // Фиксированный PnL по сделке
    time: Date;
};

// ----------------------
// Пример использования:
// import { analyzePortfolioPerformance } from './analytics';
//
// const summary = analyzePortfolioPerformance(userTrades, currentPortfolio);
// console.log('Показатели портфеля:', summary);
