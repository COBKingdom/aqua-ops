module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@supabase/supabase-js/dist/index.mjs [app-route] (ecmascript) <locals>");
;
const supabaseUrl = ("TURBOPACK compile-time value", "https://iyywnrcsacwhnpktekvd.supabase.co");
const supabaseAnonKey = ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5eXducmNzYWN3aG5wa3Rla3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU2NjQ3NzQsImV4cCI6MjA5MTI0MDc3NH0.TADVV6MvcJ2QQo4-gFrl-ATGRFXP00I7IgD1CqkevVs");
const supabase = ("TURBOPACK compile-time truthy", 1) ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(supabaseUrl, supabaseAnonKey) : "TURBOPACK unreachable";
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/profit.service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateDailyProfit",
    ()=>updateDailyProfit
]);
// app/modules/intelligence/profit.service.js
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-route] (ecmascript)");
;
async function updateDailyProfit(factoryId, period = "today") {
    let salesQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('sales').select('total_amount').eq('factory_id', factoryId);
    let expenseQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('expenses').select('amount').eq('factory_id', factoryId);
    // 🔁 Apply period filter
    if (period === "today") {
        const today = new Date().toISOString().split('T')[0];
        salesQuery = salesQuery.eq('date', today);
        expenseQuery = expenseQuery.eq('date', today);
    }
    if (period === "week") {
        const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
        salesQuery = salesQuery.gte('date', sevenDaysAgo);
        expenseQuery = expenseQuery.gte('date', sevenDaysAgo);
    }
    // "all" → no date filter
    const { data: salesData, error: salesError } = await salesQuery;
    const { data: expenseData, error: expenseError } = await expenseQuery;
    if (salesError) console.error("Sales error:", salesError);
    if (expenseError) console.error("Expense error:", expenseError);
    const sales = salesData?.reduce((sum, s)=>sum + Number(s.total_amount), 0) || 0;
    const expenses = expenseData?.reduce((sum, e)=>sum + Number(e.amount), 0) || 0;
    const profit = sales - expenses;
    return {
        sales,
        expenses,
        profit
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/cash.service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateRunway",
    ()=>calculateRunway
]);
// app/modules/intelligence/cash.service.js
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-route] (ecmascript)");
;
async function calculateRunway(factoryId) {
    // 1. Get total cash (bank table)
    const { data: cashData, error: cashError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('bank').select('amount').eq('factory_id', factoryId);
    if (cashError) {
        console.error("Cash fetch error:", cashError);
    }
    const cash = cashData?.reduce((sum, c)=>sum + Number(c.amount), 0) || 0;
    // 2. Get last 7 days expenses using your `date` column
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    const { data: expenseData, error: expenseError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('expenses').select('amount').eq('factory_id', factoryId).gte('date', sevenDaysAgo);
    if (expenseError) {
        console.error("Expense fetch error:", expenseError);
    }
    const totalExpenses = expenseData?.reduce((sum, e)=>sum + Number(e.amount), 0) || 0;
    // 3. Average daily expense
    const avgDailyExpense = totalExpenses / 7 || 0;
    // 4. Runway calculation
    const runway = avgDailyExpense === 0 ? 999 : cash / avgDailyExpense;
    return {
        cash,
        avgDailyExpense,
        runway
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/alerts.service.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkExpenseSpike",
    ()=>checkExpenseSpike,
    "checkLoss",
    ()=>checkLoss,
    "checkLowCash",
    ()=>checkLowCash,
    "checkNoSales",
    ()=>checkNoSales
]);
// app/modules/intelligence/alerts.service.js
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-route] (ecmascript)");
;
// 🧠 Prevent duplicate alerts (same type, same day)
async function alertExists(factoryId, type) {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('alerts').select('id').eq('factory_id', factoryId).eq('type', type).gte('created_at', today);
    return data && data.length > 0;
}
// Create alert safely
async function createAlert(factoryId, type, priority, message) {
    const exists = await alertExists(factoryId, type);
    if (exists) return; // 🚫 skip duplicate
    const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('alerts').insert([
        {
            factory_id: factoryId,
            type,
            priority,
            message,
            is_read: false
        }
    ]);
    if (error) {
        console.error("Create alert error:", error);
    }
}
async function checkLowCash(factoryId, runway) {
    if (runway < 7) {
        await createAlert(factoryId, 'LOW_CASH', 'HIGH', 'Cash is low — less than 7 days runway');
    }
}
async function checkNoSales(factoryId) {
    const today = new Date().toISOString().split('T')[0];
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('sales').select('id').eq('factory_id', factoryId).eq('date', today);
    if (!data || data.length === 0) {
        await createAlert(factoryId, 'NO_SALES', 'MEDIUM', 'No sales recorded today');
    }
}
async function checkLoss(factoryId, profit) {
    if (profit < 0) {
        await createAlert(factoryId, 'LOSS', 'HIGH', `You're running at a loss today (${Math.abs(profit)})`);
    }
}
async function checkExpenseSpike(factoryId) {
    const today = new Date().toISOString().split('T')[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
    const { data: todayData } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('expenses').select('amount').eq('factory_id', factoryId).eq('date', today);
    const todayTotal = todayData?.reduce((sum, e)=>sum + Number(e.amount), 0) || 0;
    const { data: weekData } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["supabase"].from('expenses').select('amount').eq('factory_id', factoryId).gte('date', sevenDaysAgo);
    const weekTotal = weekData?.reduce((sum, e)=>sum + Number(e.amount), 0) || 0;
    const avg = weekTotal / 7 || 0;
    if (avg > 0 && todayTotal > avg * 1.5) {
        await createAlert(factoryId, 'EXPENSE_SPIKE', 'MEDIUM', 'Spending is much higher than your usual daily average');
    }
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/intelligence.controller.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "runIntelligence",
    ()=>runIntelligence
]);
// app/modules/intelligence/intelligence.controller.js
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$profit$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/profit.service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$cash$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/cash.service.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$alerts$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/alerts.service.js [app-route] (ecmascript)");
;
;
;
async function runIntelligence(factoryId, period = "today") {
    const profitData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$profit$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["updateDailyProfit"])(factoryId, period);
    const cashData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$cash$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateRunway"])(factoryId);
    // 🚨 Smart Alerts
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$alerts$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkLowCash"])(factoryId, cashData.runway);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$alerts$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkNoSales"])(factoryId);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$alerts$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkLoss"])(factoryId, profitData.profit);
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$alerts$2e$service$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkExpenseSpike"])(factoryId);
    return {
        profit: profitData,
        cash: cashData
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/api/test-intelligence/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
// app/api/test-intelligence/route.js
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$intelligence$2e$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/intelligence.controller.js [app-route] (ecmascript)");
;
async function GET(request) {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'today';
    const factoryId = "96f00619-05be-40f3-bfcf-fe6881b8922e";
    const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$intelligence$2e$controller$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["runIntelligence"])(factoryId, period);
    return Response.json(result);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0mbkt8b._.js.map