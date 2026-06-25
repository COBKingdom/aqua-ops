module.exports = [
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatCurrency",
    ()=>formatCurrency
]);
function formatCurrency(amount, currency = "NGN", symbol = "₦") {
    const value = Number(amount || 0);
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(value).replace(/^/, symbol);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/intelligence.service.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "generateInsights",
    ()=>generateInsights
]);
function generateInsights({ sales, expenses, debt, cash }) {
    const insights = [];
    const alerts = [];
    const profit = sales - expenses;
    // 🔥 PROFIT
    if (profit < 0) {
        alerts.push("⚠️ Loss — Business is declining");
    } else if (profit > 0) {
        insights.push("✅ Profit — Business is growing");
    }
    // 💸 EXPENSES
    if (sales > 0 && expenses > sales * 0.7) {
        alerts.push("⚠️ Expenses are too high compared to sales");
    }
    // 🧾 DEBT
    if (sales > 0 && debt > sales * 0.5) {
        alerts.push("⚠️ Debt level is becoming risky");
    }
    // 💰 CASH
    if (cash <= 0) {
        alerts.push("🚨 Cash is low — urgent attention needed");
    }
    return {
        insights,
        alerts
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/subscription.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUserPlan",
    ()=>getUserPlan,
    "isProUser",
    ()=>isProUser
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
async function getUserPlan() {
    try {
        const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
        if (!user) {
            return "free";
        }
        // CHECK ACTIVE SUBSCRIPTION
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("subscriptions").select("plan, status, expires_at").eq("user_id", user.id).single();
        if (data?.status === "active" && data?.expires_at) {
            const expiry = new Date(data.expires_at);
            if (expiry > new Date()) {
                return data.plan;
            }
        }
        return "free";
    } catch (error) {
        console.error("Plan error:", error);
        return "free";
    }
}
async function isProUser() {
    const plan = await getUserPlan();
    return plan === "pro" || plan === "enterprise";
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/trial.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getTrialRemainingDays",
    ()=>getTrialRemainingDays,
    "getTrialStartDate",
    ()=>getTrialStartDate,
    "isTrialExpired",
    ()=>isTrialExpired,
    "setTrialStartDate",
    ()=>setTrialStartDate
]);
const TRIAL_DAYS = 30;
function getTrialStartDate() {
    if ("TURBOPACK compile-time truthy", 1) {
        return null;
    }
    //TURBOPACK unreachable
    ;
}
function setTrialStartDate() {
    if ("TURBOPACK compile-time truthy", 1) {
        return;
    }
    //TURBOPACK unreachable
    ;
    const existing = undefined;
}
function getTrialRemainingDays() {
    if ("TURBOPACK compile-time truthy", 1) {
        return TRIAL_DAYS;
    }
    //TURBOPACK unreachable
    ;
    const trialStart = undefined;
    const startDate = undefined;
    const now = undefined;
    const diff = undefined;
    const daysUsed = undefined;
    const remaining = undefined;
}
function isTrialExpired() {
    return getTrialRemainingDays() <= 0;
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/access.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAccessStatus",
    ()=>getAccessStatus,
    "hasActiveAccess",
    ()=>hasActiveAccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/subscription.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$trial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/trial.ts [app-ssr] (ecmascript)");
;
;
async function hasActiveAccess() {
    try {
        const plan = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserPlan"])();
        // PAID USERS
        if (plan === "pro" || plan === "enterprise") {
            return true;
        }
        // FREE TRIAL USERS
        return !(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$trial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTrialExpired"])();
    } catch (error) {
        console.error("Access check error:", error);
        return false;
    }
}
async function getAccessStatus() {
    try {
        const plan = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserPlan"])();
        if (plan === "pro") {
            return "pro";
        }
        if (plan === "enterprise") {
            return "enterprise";
        }
        if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$trial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isTrialExpired"])()) {
            return "expired";
        }
        return "trial";
    } catch (error) {
        console.error("Access status error:", error);
        return "expired";
    }
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getFactoryCurrency",
    ()=>getFactoryCurrency,
    "getFactoryId",
    ()=>getFactoryId,
    "getFactoryName",
    ()=>getFactoryName,
    "setFactoryName",
    ()=>setFactoryName
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
async function getFactoryId() {
    const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
    if (!user) return null;
    const { data: membership } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factory_users").select("factory_id").eq("user_id", user.id).single();
    return membership?.factory_id || null;
}
function getFactoryName() {
    return localStorage.getItem("factoryName");
}
function setFactoryName(name) {
    localStorage.setItem("factoryName", name);
}
async function getFactoryCurrency() {
    const factoryId = await getFactoryId();
    if (!factoryId) {
        return {
            code: "NGN",
            symbol: "₦"
        };
    }
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").select("currency_code, currency_symbol").eq("id", factoryId).single();
    return {
        code: data?.currency_code || "NGN",
        symbol: data?.currency_symbol || "₦"
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Dashboard",
    ()=>Dashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript) <export default as Factory>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$intelligence$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/modules/intelligence/intelligence.service.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/subscription.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$access$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/access.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
function Dashboard({ setActiveTab }) {
    const [factoryName, setFactoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    const [isPremium, setIsPremium] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [accessStatus, setAccessStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("trial");
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("today");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        sales: 0,
        costs: 0,
        production: 0,
        debt: 0,
        sachetProduction: 0,
        bottleProduction: 0,
        sachetStock: 0,
        bottleStock: 0
    });
    const getDateFilter = ()=>{
        const now = new Date();
        if (period === "today") {
            return now.toISOString().split("T")[0];
        }
        if (period === "week") {
            return new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0];
        }
        if (period === "month") {
            return new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0];
        }
    };
    // LOAD DASHBOARD
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadDashboard = async ()=>{
            const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
            if (!factoryId) return;
            try {
                const dateFilter = getDateFilter();
                const { data: sales } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gte("date", dateFilter);
                const { data: costs } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").select("*").eq("factory_id", factoryId).gte("created_at", dateFilter);
                const { data: production } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").select("*").eq("factory_id", factoryId).gte("date", dateFilter);
                const { data: debts } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gt("balance", 0);
                const totalSales = sales?.reduce((s, i)=>s + Number(i.total_amount || 0), 0) || 0;
                const totalCosts = costs?.reduce((s, i)=>s + Number(i.amount || 0), 0) || 0;
                const totalDebt = debts?.reduce((s, i)=>s + Number(i.balance || 0), 0) || 0;
                // SACHET PRODUCTION
                const sachetProduction = production?.filter((p)=>p.product_type === "sachet").reduce((s, i)=>s + Number(i.bags_produced || 0), 0) || 0;
                // BOTTLE PRODUCTION
                const bottleProduction = production?.filter((p)=>p.product_type === "bottle").reduce((s, i)=>s + Number(i.bags_produced || 0), 0) || 0;
                // SACHET SOLD
                const sachetSold = sales?.filter((s)=>s.product_type === "sachet").reduce((s, i)=>s + Number(i.bags_sold || 0), 0) || 0;
                // BOTTLE SOLD
                const bottleSold = sales?.filter((s)=>s.product_type === "bottle").reduce((s, i)=>s + Number(i.bags_sold || 0), 0) || 0;
                // STOCK
                const sachetStock = sachetProduction - sachetSold;
                const bottleStock = bottleProduction - bottleSold;
                setData({
                    sales: totalSales,
                    costs: totalCosts,
                    debt: totalDebt,
                    production: sachetProduction + bottleProduction,
                    sachetProduction,
                    bottleProduction,
                    sachetStock,
                    bottleStock
                });
                const { data: factory } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").select("name, currency_code, currency_symbol").eq("id", factoryId).single();
                if (factory) {
                    setFactoryName(factory.name || "Factory");
                    setCurrencyCode(factory.currency_code || "NGN");
                    setCurrencySymbol(factory.currency_symbol || "₦");
                }
            } catch (err) {
                console.error("Dashboard load error:", err);
            }
        };
        loadDashboard();
    }, [
        period
    ]);
    // PREMIUM + ACCESS CHECK
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAccess = async ()=>{
            const premium = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isProUser"])();
            setIsPremium(premium);
            const status = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$access$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getAccessStatus"])();
            setAccessStatus(status);
        };
        checkAccess();
    }, []);
    const profit = data.sales - data.costs;
    const netCashProfit = profit - data.debt;
    const { insights, alerts } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$app$2f$modules$2f$intelligence$2f$intelligence$2e$service$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["generateInsights"])({
        sales: data.sales,
        expenses: data.costs,
        debt: data.debt,
        cash: profit
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-5 p-3 pb-20",
        children: [
            accessStatus === "expired" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-red-50 border border-red-200 rounded-2xl p-4 space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-red-700",
                        children: "AquaOps Trial Expired"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 332,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-red-600",
                        children: "Your AquaOps free trial has expired. Please renew your subscription to continue uninterrupted factory management."
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 336,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://wa.me/2349066656691?text=Hello%20AquaOps%20Support%2C%0A%0AMy%20AquaOps%20trial%20has%20expired%20and%20I%20would%20like%20to%20activate%20my%20subscription.%0A%0APlease%20send%20payment%20details.",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        className: "inline-block bg-red-600 text-white text-sm px-4 py-2 rounded-lg",
                        children: "Contact Support"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 344,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 330,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4 flex-wrap",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-2 flex-wrap",
                        children: [
                            "today",
                            "week",
                            "month"
                        ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setPeriod(p),
                                className: `px-3 py-1.5 rounded-lg text-sm transition ${period === p ? "bg-[#2563eb] text-white" : "bg-white border border-gray-200 text-gray-700"}`,
                                children: p.charAt(0).toUpperCase() + p.slice(1)
                            }, p, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 360,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        value: currencyCode,
                        onChange: async (e)=>{
                            const value = e.target.value;
                            const currencies = {
                                NGN: "₦",
                                USD: "$",
                                GBP: "£",
                                EUR: "€",
                                KES: "KSh",
                                GHS: "GH₵",
                                ZAR: "R"
                            };
                            const symbol = currencies[value] || "₦";
                            setCurrencyCode(value);
                            setCurrencySymbol(symbol);
                            const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
                            if (factoryId) {
                                await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").update({
                                    currency_code: value,
                                    currency_symbol: symbol
                                }).eq("id", factoryId);
                            }
                        },
                        className: "bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "NGN",
                                children: "₦ NGN"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "USD",
                                children: "$ USD"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 437,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "GBP",
                                children: "£ GBP"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 441,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "EUR",
                                children: "€ EUR"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 445,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "KES",
                                children: "KSh KES"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "GHS",
                                children: "GH₵ GHS"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 453,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "ZAR",
                                children: "R ZAR"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 457,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 388,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 357,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0d1b3e] text-white rounded-2xl p-5 shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-70",
                        children: [
                            factoryName || "Factory",
                            " Overview"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 468,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold mt-3",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(profit, currencyCode, currencySymbol)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 472,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-1 opacity-80",
                        children: [
                            profit > 0 && "Profit — Business is growing",
                            profit < 0 && "Loss — Business is declining",
                            profit === 0 && "Break-even"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 480,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-4 mt-6 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Sales"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 494,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.sales, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 498,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Operational Costs"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 508,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.costs, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 512,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 507,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Debt Exposure"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 522,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.debt, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 526,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 521,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "opacity-70",
                                        children: "Net Cash Profit"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 536,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: netCashProfit < 0 ? "text-red-400" : "text-green-300",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(netCashProfit, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                        lineNumber: 540,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 535,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 466,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("expenses"),
                        className: "bg-blue-600 text-white p-3 rounded-xl flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this),
                            "Add Cost"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 562,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("sales"),
                        className: "bg-blue-50 p-3 rounded-xl flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this),
                            "Add Sale"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 574,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("production"),
                        className: "bg-blue-50 p-3 rounded-xl flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 592,
                                columnNumber: 11
                            }, this),
                            "Production"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 584,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("reports"),
                        className: "bg-orange-50 p-3 rounded-xl flex gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this),
                            "Reports"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 596,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 560,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-2 text-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Profit"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(profit, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 616,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Debt Exposure"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 626,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-red-600",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.debt, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Sachet Production"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 638,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    data.sachetProduction,
                                    " bags"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 640,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 637,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Sachet Stock"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 646,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    data.sachetStock,
                                    " bags"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 648,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 645,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Bottle Production"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 654,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    data.bottleProduction,
                                    " crates"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 656,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 653,
                        columnNumber: 1
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Bottle Stock"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 662,
                                columnNumber: 3
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    data.bottleStock,
                                    " crates"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                                lineNumber: 664,
                                columnNumber: 3
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                        lineNumber: 661,
                        columnNumber: 1
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 611,
                columnNumber: 7
            }, this),
            isPremium && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-2",
                children: [
                    alerts.map((a, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-600",
                            children: a
                        }, i, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                            lineNumber: 675,
                            columnNumber: 13
                        }, this)),
                    insights.map((i, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-green-600",
                            children: i
                        }, index, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                            lineNumber: 685,
                            columnNumber: 15
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
                lineNumber: 672,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx",
        lineNumber: 326,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Production",
    ()=>Production
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript) <export default as Factory>");
"use client";
;
;
;
;
;
function Production() {
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        productType: "sachet",
        bagsProduced: "",
        piecesPerBag: "20",
        shift: "morning"
    });
    const isBottle = form.productType === "bottle";
    const unitLabel = isBottle ? "Crates Produced" : "Bags Produced";
    const piecesLabel = isBottle ? "Bottles per Crate" : "Sachets per Bag";
    const helperText = isBottle ? "20 bottles per crate" : "20 sachets per bag";
    const handleSubmit = async ()=>{
        const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!factoryId) {
            alert("Factory not found");
            return;
        }
        if (!form.bagsProduced || !form.piecesPerBag) {
            alert("Please fill required fields");
            return;
        }
        const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").insert([
            {
                factory_id: factoryId,
                date: form.date,
                product_type: form.productType,
                bags_produced: Number(form.bagsProduced),
                pieces_per_bag: Number(form.piecesPerBag),
                shift: form.shift
            }
        ]);
        if (error) {
            console.error(error);
            alert("Error saving production");
            return;
        }
        setSaved(true);
        setTimeout(()=>{
            setSaved(false);
            setForm({
                ...form,
                bagsProduced: ""
            });
        }, 1500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Record daily production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.date,
                        onChange: (e)=>setForm({
                                ...form,
                                date: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setForm({
                                        ...form,
                                        productType: "sachet",
                                        piecesPerBag: "20"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "sachet" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Sachet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                lineNumber: 149,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setForm({
                                        ...form,
                                        productType: "bottle",
                                        piecesPerBag: "20"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "bottle" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Bottle"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        placeholder: unitLabel,
                        value: form.bagsProduced,
                        onChange: (e)=>setForm({
                                ...form,
                                bagsProduced: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: piecesLabel,
                                value: form.piecesPerBag,
                                onChange: (e)=>setForm({
                                        ...form,
                                        piecesPerBag: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 px-1",
                                children: helperText
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                                lineNumber: 229,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 209,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        className: `w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${saved ? "bg-green-600 text-white" : "bg-[#2563eb] text-white"}`,
                        children: saved ? "Saved Successfully" : "Save Production"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                        lineNumber: 236,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 255,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Track daily output to measure operational performance"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                            lineNumber: 257,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                    lineNumber: 254,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx",
        lineNumber: 116,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Sales",
    ()=>Sales
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
"use client";
;
;
;
;
;
function Sales() {
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        date: new Date().toISOString().split("T")[0],
        customerName: "",
        productType: "sachet",
        bagsSold: "",
        pricePerBag: "",
        amountPaid: "",
        notes: ""
    });
    const isBottle = form.productType === "bottle";
    const quantityLabel = isBottle ? "Crates Sold" : "Bags Sold";
    const priceLabel = isBottle ? "Price per Crate" : "Price per Bag";
    // LIVE CALCULATIONS
    const totalAmount = Number(form.bagsSold || 0) * Number(form.pricePerBag || 0);
    const balance = totalAmount - Number(form.amountPaid || 0);
    const handleSubmit = async ()=>{
        try {
            setLoading(true);
            const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
            if (!factoryId) {
                alert("Factory not found");
                return;
            }
            if (!form.customerName || !form.bagsSold || !form.pricePerBag || form.amountPaid === "") {
                alert("Please complete required fields");
                return;
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").insert([
                {
                    factory_id: factoryId,
                    date: form.date,
                    customer_name: form.customerName,
                    product_type: form.productType,
                    bags_sold: Number(form.bagsSold),
                    price_per_bag: Number(form.pricePerBag),
                    total_amount: totalAmount,
                    amount_paid: Number(form.amountPaid || 0),
                    balance
                }
            ]);
            if (error) {
                console.error(error);
                alert("Failed to save sale");
                return;
            }
            // SUCCESS
            setSaved(true);
            setTimeout(()=>{
                setSaved(false);
                setForm({
                    ...form,
                    customerName: "",
                    bagsSold: "",
                    pricePerBag: "",
                    amountPaid: "",
                    notes: ""
                });
            }, 1500);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Sales"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Record daily sales"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 180,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.date,
                        onChange: (e)=>setForm({
                                ...form,
                                date: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "text",
                        placeholder: "Customer Name",
                        value: form.customerName,
                        onChange: (e)=>setForm({
                                ...form,
                                customerName: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setForm({
                                        ...form,
                                        productType: "sachet"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "sachet" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Sachet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 222,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "button",
                                onClick: ()=>setForm({
                                        ...form,
                                        productType: "bottle"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium transition ${form.productType === "bottle" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Bottle"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 220,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        placeholder: quantityLabel,
                        value: form.bagsSold,
                        onChange: (e)=>setForm({
                                ...form,
                                bagsSold: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        placeholder: priceLabel,
                        value: form.pricePerBag,
                        onChange: (e)=>setForm({
                                ...form,
                                pricePerBag: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 282,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        placeholder: "Amount Paid",
                        value: form.amountPaid,
                        onChange: (e)=>setForm({
                                ...form,
                                amountPaid: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 rounded-xl p-4 space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Total Amount"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            "₦",
                                            totalAmount.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 325,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 320,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Amount Paid"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 331,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            "₦",
                                            Number(form.amountPaid || 0).toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 335,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 330,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between text-sm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Balance"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `font-semibold ${balance > 0 ? "text-red-600" : "text-green-600"}`,
                                        children: [
                                            "₦",
                                            balance.toLocaleString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                        lineNumber: 347,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                                lineNumber: 342,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 318,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        placeholder: "Notes",
                        value: form.notes,
                        onChange: (e)=>setForm({
                                ...form,
                                notes: e.target.value
                            }),
                        className: "w-full border border-gray-200 rounded-lg px-3 py-3 text-sm min-h-[90px]"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 361,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: loading,
                        className: `w-full h-11 rounded-lg text-sm font-semibold transition active:scale-[0.97] ${saved ? "bg-green-600 text-white" : "bg-[#2563eb] text-white"}`,
                        children: loading ? "Saving..." : saved ? "Saved Successfully" : "Save Sale"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                        lineNumber: 375,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                lineNumber: 186,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 p-3 rounded-xl text-sm text-[#0d1b3e]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                            size: 16
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                            lineNumber: 397,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "Track customer sales, debts and product movement accurately"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                            lineNumber: 399,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                    lineNumber: 396,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
                lineNumber: 394,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx",
        lineNumber: 172,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Expenses",
    ()=>Expenses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Expenses() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saved, setSaved] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [amount, setAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [notes, setNotes] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [costGroup, setCostGroup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Material Cost");
    const [category, setCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Nylon");
    const categoryOptions = {
        "Material Cost": [
            "Nylon",
            "Packaging",
            "Caps",
            "Labels",
            "Chemicals",
            "Bottles",
            "Cartons",
            "Other Material"
        ],
        "Production Cost": [
            "Diesel",
            "Petrol",
            "Electricity",
            "Machine Repairs",
            "Factory Labor",
            "Generator",
            "Maintenance",
            "Water Treatment",
            "Other Production"
        ],
        "Other Expense": [
            "Commission",
            "Transport",
            "Office Expense",
            "Rent",
            "Marketing",
            "Internet",
            "Staff Welfare",
            "Miscellaneous"
        ]
    };
    const handleCostGroupChange = (value)=>{
        setCostGroup(value);
        const firstCategory = categoryOptions[value][0];
        setCategory(firstCategory);
    };
    const handleSave = async ()=>{
        try {
            setLoading(true);
            const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
            if (!factoryId) {
                alert("Factory not found");
                return;
            }
            if (!amount) {
                alert("Please enter amount");
                return;
            }
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").insert({
                factory_id: factoryId,
                amount: Number(amount),
                notes,
                cost_group: costGroup,
                category
            });
            if (error) {
                alert(error.message);
                return;
            }
            // RESET FORM
            setAmount("");
            setNotes("");
            // SUCCESS STATE
            setSaved(true);
            setTimeout(()=>{
                setSaved(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            alert("Failed to save entry");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-5 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Operational Costs"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 147,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Track factory operational costs"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                lineNumber: 146,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 shadow-sm space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium",
                                children: "Cost Group"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: costGroup,
                                onChange: (e)=>handleCostGroupChange(e.target.value),
                                className: "w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Material Cost"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 174,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Production Cost"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 178,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: "Other Expense"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 160,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium",
                                children: "Category"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: category,
                                onChange: (e)=>setCategory(e.target.value),
                                className: "w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none",
                                children: categoryOptions[costGroup].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        children: item
                                    }, item, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                        lineNumber: 208,
                                        columnNumber: 15
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 195,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium",
                                children: "Amount"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "Enter amount",
                                value: amount,
                                onChange: (e)=>setAmount(e.target.value),
                                className: "w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 219,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium",
                                children: "Notes"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 239,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                placeholder: "Optional notes",
                                value: notes,
                                onChange: (e)=>setNotes(e.target.value),
                                className: "w-full mt-2 p-4 rounded-2xl border border-gray-200 outline-none min-h-[100px]"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                                lineNumber: 243,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 238,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSave,
                        disabled: loading,
                        className: `w-full py-4 rounded-2xl font-medium text-white transition ${saved ? "bg-green-600" : "bg-[#2563eb]"}`,
                        children: loading ? "Saving..." : saved ? "Saved Successfully" : "Save Cost Entry"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 256,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                lineNumber: 157,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-blue-50 border border-blue-100 rounded-2xl p-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#0d1b3e]",
                        children: "Operational Cost Tracking"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 277,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-600 mt-2 leading-relaxed",
                        children: "AquaOps separates material costs, production costs and operational expenses to help factories better understand profitability and operational performance."
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                        lineNumber: 281,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Debts",
    ()=>Debts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/circle-alert.js [app-ssr] (ecmascript) <export default as AlertCircle>");
"use client";
;
;
;
;
;
;
function Debts() {
    const [debts, setDebts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedCustomer, setSelectedCustomer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [payment, setPayment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    const loadDebts = async ()=>{
        const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!factoryId) return;
        const currency = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryCurrency"])();
        setCurrencyCode(currency.code);
        setCurrencySymbol(currency.symbol);
        const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gt("balance", 0);
        if (!data) return;
        const grouped = {};
        data.forEach((sale)=>{
            const name = sale.customer_name || "Unknown";
            if (!grouped[name]) grouped[name] = 0;
            grouped[name] += Number(sale.balance || 0);
        });
        const result = Object.keys(grouped).map((name)=>({
                customer: name,
                amount: grouped[name]
            }));
        setDebts(result);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadDebts();
    }, []);
    // 💰 COLLECT PAYMENT
    const handleCollect = async ()=>{
        const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
        if (!factoryId || !selectedCustomer || !payment) return;
        let remaining = Number(payment);
        const { data: sales } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).eq("customer_name", selectedCustomer).gt("balance", 0).order("created_at", {
            ascending: true
        });
        if (!sales) return;
        for (const sale of sales){
            if (remaining <= 0) break;
            const balance = Number(sale.balance);
            const pay = Math.min(balance, remaining);
            const newPaid = Number(sale.amount_paid) + pay;
            const newBalance = balance - pay;
            await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").update({
                amount_paid: newPaid,
                balance: newBalance
            }).eq("id", sale.id);
            remaining -= pay;
        }
        setPayment("");
        setSelectedCustomer(null);
        loadDebts();
    };
    const totalDebt = debts.reduce((s, d)=>s + d.amount, 0);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Debts"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 115,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Track money owed by customers"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 114,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#0d1b3e] text-white p-5 rounded-xl shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-80",
                        children: "Total Outstanding Debt"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 127,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-2xl font-bold mt-1",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(totalDebt, currencyCode, currencySymbol)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm",
                children: debts.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-sm text-gray-500",
                    children: "No outstanding debts 🎉"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                    lineNumber: 145,
                    columnNumber: 11
                }, this) : debts.map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-3 border-b last:border-none space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-sm font-medium text-gray-800",
                                                children: d.customer
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                                lineNumber: 158,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-400",
                                                children: "Outstanding"
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                                lineNumber: 162,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 157,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-red-600 font-semibold",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(d.amount, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 167,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedCustomer(d.customer),
                                className: "text-xs bg-green-600 text-white px-3 py-1 rounded-lg",
                                children: "Collect Payment"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 178,
                                columnNumber: 15
                            }, this),
                            selectedCustomer === d.customer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 mt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        placeholder: `Enter amount (${currencySymbol})`,
                                        value: payment,
                                        onChange: (e)=>setPayment(e.target.value),
                                        className: "flex-1 h-9 border rounded px-2 text-sm"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 189,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: handleCollect,
                                        className: "bg-green-600 text-white px-3 rounded text-sm",
                                        children: "OK"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                        lineNumber: 199,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 187,
                                columnNumber: 17
                            }, this)
                        ]
                    }, index, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                        lineNumber: 150,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 142,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-red-50 to-red-100 p-4 rounded-xl border border-red-200 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-start gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-red-500 text-white p-2 rounded-lg",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertCircle$3e$__["AlertCircle"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                lineNumber: 221,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm font-semibold text-red-700",
                                    children: "Cash Flow Alert"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-700 mt-1",
                                    children: "Follow up on unpaid balances to improve your cash flow."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                            lineNumber: 224,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                    lineNumber: 218,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
                lineNumber: 216,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BottomNav",
    ()=>BottomNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/house.js [app-ssr] (ecmascript) <export default as Home>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-ssr] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/landmark.js [app-ssr] (ecmascript) <export default as Landmark>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/banknote.js [app-ssr] (ecmascript) <export default as Banknote>");
"use client";
;
;
function BottomNav({ activeTab, setActiveTab }) {
    const tabs = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$house$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Home$3e$__["Home"]
        },
        {
            id: "production",
            label: "Production",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"]
        },
        {
            id: "sales",
            label: "Sales",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"]
        },
        {
            id: "expenses",
            label: "Expenses",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"]
        },
        {
            id: "debts",
            label: "Debts",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
        },
        {
            id: "loans",
            label: "Loans",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$banknote$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Banknote$3e$__["Banknote"]
        },
        {
            id: "bank",
            label: "Bank",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$landmark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Landmark$3e$__["Landmark"]
        },
        {
            id: "reports",
            label: "Reports",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white border-t border-gray-100",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-4 gap-1.5 p-1.5",
            children: tabs.map((tab)=>{
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: ()=>setActiveTab(tab.id),
                    className: `relative flex flex-col items-center justify-center py-1.5 rounded-lg transition
                ${isActive ? "bg-[#0d1b3e] text-white" : "bg-white text-[#1f3a8a] border border-[#e0e7ff]"}
              `,
                    children: [
                        isActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "absolute top-1 right-2 w-1.5 h-1.5 bg-orange-400 rounded-full"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 53,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                            size: 18,
                            strokeWidth: 2
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 56,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-[9px] mt-0.5 font-medium leading-none",
                            children: tab.label
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    ]
                }, tab.id, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
                    lineNumber: 40,
                    columnNumber: 13
                }, this);
            })
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/premium.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PREMIUM_ENABLED",
    ()=>PREMIUM_ENABLED,
    "canUseApp",
    ()=>canUseApp,
    "canUsePremium",
    ()=>canUsePremium,
    "clearPremiumCache",
    ()=>clearPremiumCache,
    "isPremiumUser",
    ()=>isPremiumUser,
    "isTrialActive",
    ()=>isTrialActive
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
const PREMIUM_ENABLED = false;
// 🔥 CACHE
let cached = {
    factoryId: null,
    isPremium: false
};
async function isPremiumUser() {
    // ✅ FORCE PREMIUM WHEN DISABLED
    if ("TURBOPACK compile-time truthy", 1) return true;
    //TURBOPACK unreachable
    ;
}
function isTrialActive() {
    const start = localStorage.getItem("trialStart");
    if (!start) {
        const now = new Date().toISOString();
        localStorage.setItem("trialStart", now);
        return true;
    }
    const startDate = new Date(start);
    const now = new Date();
    const diffDays = (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 30;
}
async function canUseApp() {
    if ("TURBOPACK compile-time truthy", 1) return true;
    //TURBOPACK unreachable
    ;
}
async function canUsePremium() {
    if ("TURBOPACK compile-time truthy", 1) return true;
    //TURBOPACK unreachable
    ;
}
function clearPremiumCache() {
    cached = {
        factoryId: null,
        isPremium: false
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Reports",
    ()=>Reports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$premium$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/premium.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
function Reports({ setActiveTab }) {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        sales: 0,
        costs: 0,
        debt: 0,
        materialCost: 0,
        productionCost: 0,
        otherExpense: 0,
        sachetProduction: 0,
        bottleProduction: 0,
        sachetStock: 0,
        bottleStock: 0
    });
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("today");
    const [isPremium, setIsPremium] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    // PREMIUM STATUS
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkPremium = async ()=>{
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$premium$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["isPremiumUser"])();
            setIsPremium(result);
        };
        checkPremium();
    }, []);
    const getDateFilter = ()=>{
        const now = new Date();
        if (period === "today") {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            return startOfDay.toISOString().split("T")[0];
        }
        if (period === "week") {
            return new Date(now.getTime() - 7 * 86400000).toISOString().split("T")[0];
        }
        if (period === "month") {
            return new Date(now.getTime() - 30 * 86400000).toISOString().split("T")[0];
        }
    };
    const loadReport = async ()=>{
        try {
            const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
            if (!factoryId) return;
            const currency = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryCurrency"])();
            setCurrencyCode(currency.code);
            setCurrencySymbol(currency.symbol);
            const dateFilter = getDateFilter();
            // SALES
            const { data: sales } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gte("date", dateFilter);
            // COSTS
            const { data: expenses } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").select("*").eq("factory_id", factoryId).gte("created_at", dateFilter);
            // PRODUCTION
            const { data: production } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").select("*").eq("factory_id", factoryId).gte("date", dateFilter);
            // DEBTS
            const { data: debts } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId).gt("balance", 0);
            const totalSales = sales?.reduce((s, i)=>s + Number(i.total_amount || 0), 0) || 0;
            const totalCosts = expenses?.reduce((s, i)=>s + Number(i.amount || 0), 0) || 0;
            const totalDebt = debts?.reduce((s, i)=>s + Number(i.balance || 0), 0) || 0;
            // COST BREAKDOWN
            const materialCost = expenses?.filter((e)=>e.cost_group === "Material Cost").reduce((s, i)=>s + Number(i.amount || 0), 0) || 0;
            const productionCost = expenses?.filter((e)=>e.cost_group === "Production Cost").reduce((s, i)=>s + Number(i.amount || 0), 0) || 0;
            const otherExpense = expenses?.filter((e)=>e.cost_group === "Other Expense").reduce((s, i)=>s + Number(i.amount || 0), 0) || 0;
            // SACHET PRODUCTION
            const sachetProduction = production?.filter((p)=>p.product_type === "sachet").reduce((s, i)=>s + Number(i.bags_produced || 0), 0) || 0;
            // BOTTLE PRODUCTION
            const bottleProduction = production?.filter((p)=>p.product_type === "bottle").reduce((s, i)=>s + Number(i.bags_produced || 0), 0) || 0;
            // SACHET SOLD
            const sachetSold = sales?.filter((s)=>s.product_type === "sachet").reduce((s, i)=>s + Number(i.bags_sold || 0), 0) || 0;
            // BOTTLE SOLD
            const bottleSold = sales?.filter((s)=>s.product_type === "bottle").reduce((s, i)=>s + Number(i.bags_sold || 0), 0) || 0;
            // STOCK
            const sachetStock = sachetProduction - sachetSold;
            const bottleStock = bottleProduction - bottleSold;
            setData({
                sales: totalSales,
                costs: totalCosts,
                debt: totalDebt,
                materialCost,
                productionCost,
                otherExpense,
                sachetProduction,
                bottleProduction,
                sachetStock,
                bottleStock
            });
        } catch (error) {
            console.error(error);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadReport();
    }, [
        period
    ]);
    const profit = data.sales - data.costs;
    const netCashProfit = profit - data.debt;
    // REPORT GENERATOR
    const generateReportText = ()=>{
        let text = `📊 OPERATIONAL REPORT — ${period.toUpperCase()}

━━━━━━━━━━━━━━━━━━━

💰 Revenue
Sales: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.sales, currencyCode, currencySymbol)}

💸 Operational Costs
Total: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.costs, currencyCode, currencySymbol)}

• Material Cost: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.materialCost, currencyCode, currencySymbol)}

• Production Cost: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.productionCost, currencyCode, currencySymbol)}

• Other Expense: ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.otherExpense, currencyCode, currencySymbol)}

📦 Sachet Production
${data.sachetProduction} bags

📦 Sachet Stock
${data.sachetStock} bags

📦 Bottle Production
${data.bottleProduction} crates

📦 Bottle Stock
${data.bottleStock} crates

⚠️ Debt Exposure
${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.debt, currencyCode, currencySymbol)}

━━━━━━━━━━━━━━━━━━━

📈 Net Result
${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(profit, currencyCode, currencySymbol)}
`;
        return text;
    };
    const handleWhatsApp = ()=>{
        const text = encodeURIComponent(generateReportText());
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };
    const handleEmail = ()=>{
        const subject = encodeURIComponent("Operational Report");
        const body = encodeURIComponent(generateReportText());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Reports"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 449,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Operational intelligence summary"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 453,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 448,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                    [
                        {
                            key: "today",
                            label: "Today"
                        },
                        {
                            key: "week",
                            label: "Week"
                        },
                        {
                            key: "month",
                            label: "Month"
                        }
                    ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>setPeriod(p.key),
                            className: `px-3 py-1 rounded-lg text-sm ${period === p.key ? "bg-[#2563eb] text-white" : "bg-gray-100"}`,
                            children: p.label
                        }, p.key, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                            lineNumber: 475,
                            columnNumber: 11
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab("history"),
                        className: "px-3 py-1 rounded-lg text-sm bg-black text-white",
                        children: "History"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 491,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 459,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-black to-gray-800 text-white p-5 rounded-xl shadow-md",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs opacity-80",
                        children: "Net Result"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 507,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-3xl font-bold mt-2",
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(profit, currencyCode, currencySymbol)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 511,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs mt-1 opacity-90",
                        children: [
                            profit > 0 && "Profit — Business is growing",
                            profit < 0 && "Loss — Business is declining",
                            profit === 0 && "Break-even"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 519,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-4 border-t border-white/20 pt-3 flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs opacity-70",
                                        children: "Net Cash Profit"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                        lineNumber: 533,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `text-lg font-semibold ${netCashProfit < 0 ? "text-red-400" : "text-green-400"}`,
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(netCashProfit, currencyCode, currencySymbol)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                        lineNumber: 537,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 532,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-70",
                                children: netCashProfit < 0 ? "Loss" : "Cash Profit"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 552,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 530,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 505,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Sales"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 566,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.sales, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 570,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 565,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Operational Costs"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 580,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.costs, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 584,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 579,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Sachet Production"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 594,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: [
                                    data.sachetProduction,
                                    " bags"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 598,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 593,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Sachet Stock"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 604,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: [
                                    data.sachetStock,
                                    " bags"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 608,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 603,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Bottle Production"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 614,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: [
                                    data.bottleProduction,
                                    " crates"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 618,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 613,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-50 border border-blue-100 p-3 rounded-xl shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold text-[#0d1b3e]",
                                children: "Bottle Stock"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 624,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-lg font-bold mt-1",
                                children: [
                                    data.bottleStock,
                                    " crates"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white border border-blue-100 rounded-xl shadow-sm p-4 space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-[#2563eb]",
                        children: "Cost Breakdown"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Material Cost"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 643,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.materialCost, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 647,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 642,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Production Cost"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 657,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.productionCost, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 661,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 656,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Other Expense"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 671,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.otherExpense, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 675,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 670,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between text-sm text-red-600",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Debt Exposure"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 685,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(data.debt, currencyCode, currencySymbol)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                                lineNumber: 689,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 684,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 636,
                columnNumber: 7
            }, this),
            isPremium ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleWhatsApp,
                        className: "w-full h-11 bg-green-600 text-white rounded-lg font-semibold",
                        children: "Share WhatsApp"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 704,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleEmail,
                        className: "w-full h-11 bg-gray-800 text-white rounded-lg font-semibold",
                        children: "Share Email"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 713,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 702,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm text-center space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm font-semibold text-[#0d1b3e]",
                        children: "🔒 Premium Feature"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 725,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Upgrade to unlock reports & history"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 729,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "bg-black text-white px-4 py-2 rounded-lg text-sm",
                        children: "Upgrade"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                        lineNumber: 733,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
                lineNumber: 723,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx",
        lineNumber: 445,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Loans",
    ()=>Loans
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Loans() {
    const [loans, setLoans] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [selectedIndex, setSelectedIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [repayment, setRepayment] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        source: "",
        amount: "",
        date: new Date().toISOString().split("T")[0]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = async ()=>{
            const saved = JSON.parse(localStorage.getItem("loans") || "[]");
            setLoans(saved);
            const currency = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryCurrency"])();
            setCurrencyCode(currency.code);
            setCurrencySymbol(currency.symbol);
        };
        loadData();
    }, []);
    const handleSubmit = ()=>{
        if (!form.source || !form.amount) return;
        const newLoan = {
            ...form,
            amount: Number(form.amount),
            amount_paid: 0
        };
        const updated = [
            newLoan,
            ...loans
        ];
        setLoans(updated);
        localStorage.setItem("loans", JSON.stringify(updated));
        setForm({
            source: "",
            amount: "",
            date: form.date
        });
    };
    const handleRepayment = ()=>{
        if (selectedIndex === null || !repayment) return;
        const updated = [
            ...loans
        ];
        const loan = updated[selectedIndex];
        const pay = Number(repayment);
        const totalPaid = Number(loan.amount_paid || 0) + pay;
        if (totalPaid > loan.amount) {
            alert("Repayment exceeds loan amount");
            return;
        }
        loan.amount_paid = totalPaid;
        setLoans(updated);
        localStorage.setItem("loans", JSON.stringify(updated));
        setRepayment("");
        setSelectedIndex(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Loans"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Track business loans"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: [
                                    "Amount (",
                                    currencySymbol,
                                    ")"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                placeholder: "e.g. 50000",
                                value: form.amount,
                                onChange: (e)=>setForm({
                                        ...form,
                                        amount: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-3 rounded-lg text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                "Loan Amount:",
                                " ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number(form.amount || 0), currencyCode, currencySymbol)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                            lineNumber: 136,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Source"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                placeholder: "e.g. MD, Friend",
                                value: form.source,
                                onChange: (e)=>setForm({
                                        ...form,
                                        source: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-sm font-medium text-[#0d1b3e]",
                                children: "Date"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: form.date,
                                onChange: (e)=>setForm({
                                        ...form,
                                        date: e.target.value
                                    }),
                                className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 167,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: !form.source || !form.amount,
                        className: "w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold active:scale-[0.97]",
                        children: "Add Loan"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-3 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mb-2",
                        children: "Recent Loans"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-[300px] overflow-y-auto",
                        children: [
                            loans.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 text-center",
                                children: "No loans yet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                lineNumber: 207,
                                columnNumber: 13
                            }, this),
                            loans.map((item, index)=>{
                                const balance = item.amount - (item.amount_paid || 0);
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-blue-50 px-3 py-2 rounded-lg space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex justify-between items-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-medium text-[#2563eb]",
                                                            children: item.source
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                            lineNumber: 225,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-gray-400",
                                                            children: item.date
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                            lineNumber: 229,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-right",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-semibold text-[#0d1b3e]",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount, currencyCode, currencySymbol)
                                                        }, void 0, false, {
                                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                            lineNumber: 236,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-red-500",
                                                            children: [
                                                                "Balance:",
                                                                " ",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(balance, currencyCode, currencySymbol)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                            lineNumber: 244,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                            lineNumber: 222,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedIndex(index),
                                            className: "text-xs bg-green-600 text-white px-3 py-1 rounded-lg",
                                            children: "Repay"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                            lineNumber: 258,
                                            columnNumber: 17
                                        }, this),
                                        selectedIndex === index && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex gap-2 mt-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    placeholder: `Enter amount (${currencySymbol})`,
                                                    value: repayment,
                                                    onChange: (e)=>setRepayment(e.target.value),
                                                    className: "flex-1 h-9 border rounded px-2 text-sm"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                    lineNumber: 269,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: handleRepayment,
                                                    className: "bg-green-600 text-white px-3 rounded text-sm",
                                                    children: "OK"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                                    lineNumber: 279,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                            lineNumber: 267,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                                    lineNumber: 217,
                                    columnNumber: 15
                                }, this);
                            })
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx",
        lineNumber: 96,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Bank",
    ()=>Bank
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function Bank() {
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        type: "deposit",
        amount: "",
        date: new Date().toISOString().split("T")[0]
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadData = async ()=>{
            const saved = JSON.parse(localStorage.getItem("bank") || "[]");
            setRecords(saved);
            const currency = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryCurrency"])();
            setCurrencyCode(currency.code);
            setCurrencySymbol(currency.symbol);
        };
        loadData();
    }, []);
    const handleSubmit = ()=>{
        if (!form.amount) return;
        const newRecord = {
            ...form,
            amount: Number(form.amount)
        };
        const updated = [
            newRecord,
            ...records
        ];
        setRecords(updated);
        localStorage.setItem("bank", JSON.stringify(updated));
        setForm({
            ...form,
            amount: ""
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 p-3 pb-20",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "pt-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-lg font-bold text-[#0d1b3e]",
                        children: "Bank"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500",
                        children: "Manage deposits & withdrawals"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 70,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                lineNumber: 64,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-4 rounded-xl shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setForm({
                                        ...form,
                                        type: "deposit"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium ${form.type === "deposit" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Deposit"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setForm({
                                        ...form,
                                        type: "withdraw"
                                    }),
                                className: `h-11 rounded-lg text-sm font-medium ${form.type === "withdraw" ? "bg-[#2563eb] text-white" : "bg-blue-50 text-[#2563eb]"}`,
                                children: "Withdraw"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                lineNumber: 96,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 78,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "number",
                        placeholder: `Amount (${currencySymbol})`,
                        value: form.amount,
                        onChange: (e)=>setForm({
                                ...form,
                                amount: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-gray-50 p-3 rounded-lg text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: [
                                form.type === "deposit" ? "Deposit Amount" : "Withdrawal Amount",
                                ":",
                                " ",
                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(Number(form.amount || 0), currencyCode, currencySymbol)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                            lineNumber: 130,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 128,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "date",
                        value: form.date,
                        onChange: (e)=>setForm({
                                ...form,
                                date: e.target.value
                            }),
                        className: "w-full h-11 border border-gray-200 rounded-lg px-3 text-sm"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleSubmit,
                        disabled: !form.amount,
                        className: "w-full h-11 bg-[#2563eb] text-white rounded-lg text-sm font-semibold",
                        children: "Save"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                lineNumber: 76,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white p-3 rounded-xl shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-gray-500 mb-2",
                        children: "Transactions"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2 max-h-[300px] overflow-y-auto",
                        children: [
                            records.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-400 text-center",
                                children: "No transactions yet"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                lineNumber: 175,
                                columnNumber: 13
                            }, this),
                            records.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-between items-center bg-blue-50 px-3 py-2 rounded-lg",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium text-[#2563eb] capitalize",
                                                    children: item.type
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-gray-400",
                                                    children: item.date
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                                    lineNumber: 191,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                            lineNumber: 186,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm font-semibold text-[#0d1b3e]",
                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount, currencyCode, currencySymbol)
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                            lineNumber: 196,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, index, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                        lineNumber: 172,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
                lineNumber: 166,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getUser",
    ()=>getUser,
    "signIn",
    ()=>signIn,
    "signOutUser",
    ()=>signOutUser,
    "signUp",
    ()=>signUp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
async function signUp(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
        email,
        password
    });
}
async function signIn(email, password) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
        email,
        password
    });
}
async function signOutUser() {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signOut();
        // Clear persisted local state
        localStorage.removeItem("aquaops-factory");
        // Future cleanup stores can go here
        // localStorage.removeItem("expense-store")
        // localStorage.removeItem("sales-store")
        // Redirect safely
        window.location.href = "/";
    } catch (error) {
        console.error("Sign out error:", error);
    }
}
async function getUser() {
    const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
    return data.user;
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/clsx/dist/clsx.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-ssr] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/@radix-ui/react-slot/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/class-variance-authority/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            destructive: 'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
            outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2 has-[>svg]:px-3',
            sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
            lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
            icon: 'size-9',
            'icon-sm': 'size-8',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant, size, asChild = false, ...props }) {
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        "data-slot": "button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx",
        lineNumber: 52,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AccountScreen",
    ()=>AccountScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/auth.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/subscription.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$trial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/trial.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
function AccountScreen() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [factoryName, setFactoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [plan, setPlan] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Free");
    const [trialDays, setTrialDays] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(30);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadAccount = async ()=>{
            try {
                // GET LOGGED IN USER
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                if (user?.email) {
                    setEmail(user.email);
                }
                // GET FACTORY
                const factoryId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
                if (factoryId) {
                    const { data: factory } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").select("name").eq("id", factoryId).single();
                    if (factory?.name) {
                        setFactoryName(factory.name);
                    }
                }
                // GET USER PLAN
                const userPlan = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$subscription$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getUserPlan"])();
                if (userPlan === "pro") {
                    setPlan("Pro");
                } else if (userPlan === "enterprise") {
                    setPlan("Enterprise");
                } else {
                    setPlan("Free");
                }
                // GET TRIAL DAYS
                const remainingDays = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$trial$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getTrialRemainingDays"])();
                setTrialDays(remainingDays);
            } catch (error) {
                console.error("Account load error:", error);
            }
        };
        loadAccount();
    }, []);
    const handleLogout = async ()=>{
        try {
            setLoading(true);
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$auth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["signOutUser"])();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-5 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Account"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 98,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Manage your AquaOps account"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 102,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                lineNumber: 97,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 shadow-sm space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 111,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: email || "No email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 115,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 110,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Factory"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 121,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-medium",
                                children: factoryName || "No factory"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 125,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Subscription Plan"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 132,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mt-1",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `text-sm font-semibold px-3 py-1 rounded-full ${plan === "Free" ? "bg-gray-100 text-gray-700" : plan === "Pro" ? "bg-blue-100 text-blue-700" : "bg-purple-100 text-purple-700"}`,
                                    children: plan
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                    lineNumber: 138,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 131,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            plan === "Free" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-yellow-50 border border-yellow-200 rounded-2xl p-5 shadow-sm space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-yellow-800",
                        children: "AquaOps Trial"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-yellow-700",
                        children: trialDays > 0 ? `${trialDays} days remaining in your free AquaOps trial.` : "Your AquaOps trial has expired."
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 163,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-yellow-600",
                        children: "Continue managing your water factory seamlessly by upgrading your subscription plan."
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 169,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                lineNumber: 157,
                columnNumber: 9
            }, this),
            plan === "Free" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-[#0d1b3e] to-[#2563eb] text-white rounded-2xl p-5 shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-semibold",
                                children: "Upgrade to AquaOps Pro"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 183,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm opacity-90 mt-1",
                                children: "Unlock advanced operational insights, premium reports, inventory tools and future AI-powered factory intelligence."
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                                lineNumber: 187,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 182,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                        className: "bg-white text-[#0d1b3e] hover:bg-gray-100",
                        children: "Upgrade Plan"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                        lineNumber: 195,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                lineNumber: 180,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 shadow-sm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                    onClick: handleLogout,
                    disabled: loading,
                    className: "w-full",
                    variant: "destructive",
                    children: loading ? "Signing out..." : "Sign Out"
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                    lineNumber: 207,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
                lineNumber: 205,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx",
        lineNumber: 94,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/protected-route.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ProtectedRoute",
    ()=>ProtectedRoute
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function ProtectedRoute({ children }) {
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!loading && !user) {
            router.push("/onboarding");
        }
    }, [
        user,
        loading,
        router
    ]);
    // WAIT FOR AUTH
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen flex items-center justify-center text-sm text-gray-500",
            children: "Loading AquaOps..."
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/protected-route.tsx",
            lineNumber: 25,
            columnNumber: 7
        }, this);
    }
    // NO USER
    if (!user) {
        return null;
    }
    // AUTHENTICATED
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminSubscriptions",
    ()=>AdminSubscriptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/ui/button.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function AdminSubscriptions() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [authorized, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [users, setUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadUsers();
    }, []);
    const loadUsers = async ()=>{
        try {
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            const { data: adminUser } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("admin_users").select("email").eq("email", user?.email).single();
            if (!adminUser) return;
            setAuthorized(true);
            const { data } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("saas_customers").select("*").order("signup_date", {
                ascending: false
            });
            if (!data) return;
            setUsers(data.map((item)=>({
                    factory_id: item.factory_id,
                    factory_name: item.factory_name,
                    user_id: item.user_id,
                    plan: item.plan || "Starter",
                    status: item.status || "Trial",
                    trial_end_date: item.trial_end_date,
                    expires_at: item.expires_at
                })));
        } catch (error) {
            console.error(error);
        }
    };
    const activateMonthly = async (userId)=>{
        try {
            setLoading(true);
            const now = new Date();
            const expiry = new Date();
            expiry.setMonth(expiry.getMonth() + 1);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("subscriptions").upsert({
                user_id: userId,
                plan: "Monthly",
                status: "Active",
                started_at: now.toISOString(),
                expires_at: expiry.toISOString()
            });
            if (error) {
                alert(error.message);
                return;
            }
            alert("Monthly subscription activated");
            loadUsers();
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    const activateAnnual = async (userId)=>{
        try {
            setLoading(true);
            const now = new Date();
            const expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 1);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("subscriptions").upsert({
                user_id: userId,
                plan: "Annual",
                status: "Active",
                started_at: now.toISOString(),
                expires_at: expiry.toISOString()
            });
            if (error) {
                alert(error.message);
                return;
            }
            alert("Annual subscription activated");
            loadUsers();
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    const suspendSubscription = async (userId)=>{
        try {
            setLoading(true);
            const { error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("subscriptions").upsert({
                user_id: userId,
                plan: "Starter",
                status: "Suspended"
            });
            if (error) {
                alert(error.message);
                return;
            }
            alert("Subscription suspended");
            loadUsers();
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    if (!authorized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: "Unauthorized"
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-5 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Subscription Admin"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Manage AquaOps subscriptions"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                        lineNumber: 214,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: users.map((user)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-5 shadow-sm space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Factory"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 228,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-bold text-lg",
                                        children: user.factory_name
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 232,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 227,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Plan"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 238,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-semibold",
                                        children: user.plan
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 242,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 237,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Status"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 248,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: user.status
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 252,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 247,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Trial Ends"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 258,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: new Date(user.trial_end_date).toLocaleDateString()
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 262,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 257,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: "Subscription Expiry"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 270,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: user.expires_at ? new Date(user.expires_at).toLocaleDateString() : "Not subscribed"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 274,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 269,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        disabled: loading,
                                        onClick: ()=>activateMonthly(user.user_id),
                                        children: "Monthly"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 285,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        disabled: loading,
                                        onClick: ()=>activateAnnual(user.user_id),
                                        className: "bg-green-600",
                                        children: "Annual"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 296,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "destructive",
                                        disabled: loading,
                                        onClick: ()=>suspendSubscription(user.user_id),
                                        children: "Suspend"
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                        lineNumber: 308,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                                lineNumber: 283,
                                columnNumber: 13
                            }, this)
                        ]
                    }, user.factory_id, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                        lineNumber: 222,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
                lineNumber: 219,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "HistoryScreen",
    ()=>HistoryScreen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/format.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function HistoryScreen() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [activities, setActivities] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currencyCode, setCurrencyCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("NGN");
    const [currencySymbol, setCurrencySymbol] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("₦");
    const [period, setPeriod] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("today");
    const [startDate, setStartDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [endDate, setEndDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [useCustomDates, setUseCustomDates] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const getDateFilter = ()=>{
        const now = new Date();
        if (useCustomDates && startDate) {
            return startDate;
        }
        if (period === "today") {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            return startOfDay.toISOString();
        }
        if (period === "week") {
            return new Date(now.getTime() - 7 * 86400000).toISOString();
        }
        if (period === "month") {
            return new Date(now.getTime() - 30 * 86400000).toISOString();
        }
        return null;
    };
    const loadHistory = async ()=>{
        try {
            setLoading(true);
            const factoryId = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryId"])();
            if (!factoryId) return;
            const currency = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getFactoryCurrency"])();
            setCurrencyCode(currency.code);
            setCurrencySymbol(currency.symbol);
            const dateFilter = getDateFilter();
            // SALES
            let salesQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("sales").select("*").eq("factory_id", factoryId);
            if (dateFilter) {
                salesQuery = salesQuery.gte("created_at", dateFilter);
            }
            if (useCustomDates && endDate) {
                salesQuery = salesQuery.lte("created_at", `${endDate}T23:59:59`);
            }
            const { data: sales } = await salesQuery;
            // EXPENSES
            let expenseQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("expenses").select("*").eq("factory_id", factoryId);
            if (dateFilter) {
                expenseQuery = expenseQuery.gte("created_at", dateFilter);
            }
            if (useCustomDates && endDate) {
                expenseQuery = expenseQuery.lte("created_at", `${endDate}T23:59:59`);
            }
            const { data: expenses } = await expenseQuery;
            // PRODUCTION
            let productionQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("production").select("*").eq("factory_id", factoryId);
            if (dateFilter) {
                productionQuery = productionQuery.gte("created_at", dateFilter);
            }
            if (useCustomDates && endDate) {
                productionQuery = productionQuery.lte("created_at", `${endDate}T23:59:59`);
            }
            const { data: production } = await productionQuery;
            // LOANS
            let loansQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("loans").select("*").eq("factory_id", factoryId);
            if (dateFilter) {
                loansQuery = loansQuery.gte("created_at", dateFilter);
            }
            if (useCustomDates && endDate) {
                loansQuery = loansQuery.lte("created_at", `${endDate}T23:59:59`);
            }
            const { data: loans } = await loansQuery;
            // BANK
            let bankQuery = __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("bank").select("*").eq("factory_id", factoryId);
            if (dateFilter) {
                bankQuery = bankQuery.gte("created_at", dateFilter);
            }
            if (useCustomDates && endDate) {
                bankQuery = bankQuery.lte("created_at", `${endDate}T23:59:59`);
            }
            const { data: bank } = await bankQuery;
            let combined = [];
            // SALES
            sales?.forEach((item)=>{
                combined.push({
                    type: "sale",
                    title: `Sale — ${item.customer_name || "Customer"}`,
                    amount: item.total_amount,
                    created_at: item.created_at
                });
            });
            // EXPENSES
            expenses?.forEach((item)=>{
                combined.push({
                    type: "expense",
                    title: `Expense — ${item.category || "Expense"}`,
                    amount: item.amount,
                    created_at: item.created_at
                });
            });
            // PRODUCTION
            production?.forEach((item)=>{
                combined.push({
                    type: "production",
                    title: `Production — ${item.bags_produced} bags`,
                    created_at: item.created_at
                });
            });
            // LOANS
            loans?.forEach((item)=>{
                combined.push({
                    type: "loan",
                    title: `Loan — ${item.description || "Loan"}`,
                    amount: item.amount,
                    created_at: item.created_at
                });
            });
            // BANK
            bank?.forEach((item)=>{
                combined.push({
                    type: "bank",
                    title: `Bank — ${item.description || "Transaction"}`,
                    amount: item.amount,
                    created_at: item.created_at
                });
            });
            // SORT
            combined.sort((a, b)=>new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setActivities(combined);
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadHistory();
    }, [
        period
    ]);
    const handleApplyCustomDates = ()=>{
        if (!startDate || !endDate) {
            alert("Please select both dates");
            return;
        }
        setUseCustomDates(true);
        loadHistory();
    };
    const generateHistoryText = ()=>{
        let text = `📜 AQUAOPS HISTORY REPORT

━━━━━━━━━━━━━━━━━━━

`;
        activities.forEach((item)=>{
            text += `${item.title}`;
            if (item.amount !== undefined) {
                text += ` — ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount, currencyCode, currencySymbol)}`;
            }
            text += `
${new Date(item.created_at).toLocaleString()}

━━━━━━━━━━━━━━━━━━━

`;
        });
        return text;
    };
    const handleWhatsApp = ()=>{
        const text = encodeURIComponent(generateHistoryText());
        window.open(`https://wa.me/?text=${text}`, "_blank");
    };
    const handleEmail = ()=>{
        const subject = encodeURIComponent("AquaOps History Report");
        const body = encodeURIComponent(generateHistoryText());
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-5 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "Activity History"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "Complete operational timeline"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 444,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 439,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex gap-2 flex-wrap",
                children: [
                    {
                        key: "today",
                        label: "Today"
                    },
                    {
                        key: "week",
                        label: "Week"
                    },
                    {
                        key: "month",
                        label: "Month"
                    }
                ].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>{
                            setUseCustomDates(false);
                            setPeriod(p.key);
                        },
                        className: `px-3 py-1.5 rounded-lg text-sm ${period === p.key && !useCustomDates ? "bg-[#2563eb] text-white" : "bg-white border border-gray-200"}`,
                        children: p.label
                    }, p.key, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 466,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 450,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-4 shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm font-semibold",
                                children: "Custom Date Range"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 489,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500 mt-1",
                                children: "Generate history between specific dates"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 493,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 488,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: startDate,
                                onChange: (e)=>setStartDate(e.target.value),
                                className: "border border-gray-200 rounded-xl p-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 500,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "date",
                                value: endDate,
                                onChange: (e)=>setEndDate(e.target.value),
                                className: "border border-gray-200 rounded-xl p-3 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 511,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 498,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: handleApplyCustomDates,
                        className: "w-full bg-black text-white rounded-xl py-3 text-sm font-medium",
                        children: "Apply Date Filter"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 524,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 486,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gradient-to-r from-black to-gray-800 rounded-2xl p-4 text-white shadow-sm space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "font-semibold",
                                children: "History Actions"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 539,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs opacity-80 mt-1",
                                children: "Share or export operational history"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 543,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 538,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleWhatsApp,
                                className: "bg-green-600 rounded-xl py-3 text-sm font-medium",
                                children: "Share WhatsApp"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 550,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleEmail,
                                className: "bg-white text-black rounded-xl py-3 text-sm font-medium",
                                children: "Share Email"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                lineNumber: 559,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 536,
                columnNumber: 7
            }, this),
            loading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-sm text-gray-500",
                children: "Loading history..."
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 572,
                columnNumber: 9
            }, this),
            !loading && activities.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-5 shadow-sm text-sm text-gray-500",
                children: "No activity found."
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 580,
                columnNumber: 11
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: activities.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-start justify-between gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-semibold capitalize",
                                            children: item.title
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                            lineNumber: 598,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-gray-500 mt-1",
                                            children: new Date(item.created_at).toLocaleString()
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                            lineNumber: 602,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                    lineNumber: 597,
                                    columnNumber: 17
                                }, this),
                                item.amount !== undefined && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-semibold",
                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$format$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatCurrency"])(item.amount, currencyCode, currencySymbol)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                                    lineNumber: 611,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                            lineNumber: 595,
                            columnNumber: 15
                        }, this)
                    }, index, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                        lineNumber: 590,
                        columnNumber: 13
                    }, this))
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx",
        lineNumber: 436,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/current-factory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentFactory",
    ()=>getCurrentFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
;
async function getCurrentFactory() {
    const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
    if (!user) {
        return null;
    }
    // STEP 1
    // GET USER MEMBERSHIP
    const { data: membership, error: membershipError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factory_users").select("factory_id, role").eq("user_id", user.id).single();
    if (membershipError || !membership) {
        return null;
    }
    // STEP 2
    // LOAD FACTORY
    const { data: factory, error: factoryError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").select("*").eq("id", membership.factory_id).single();
    if (factoryError || !factory) {
        return null;
    }
    return {
        ...factory,
        role: membership.role
    };
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminDashboard",
    ()=>AdminDashboard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function AdminDashboard({ onNavigate }) {
    const [authorized, setAuthorized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [overview, setOverview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [customers, setCustomers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadDashboard();
    }, []);
    const loadDashboard = async ()=>{
        try {
            const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
            const { data: adminUser } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("admin_users").select("email").eq("email", user?.email).single();
            if (!adminUser) {
                setLoading(false);
                return;
            }
            setAuthorized(true);
            const { data: overviewData } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("saas_overview").select("*").single();
            const { data: customerData } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("saas_customers").select("*").order("signup_date", {
                ascending: false
            }).limit(10);
            setOverview(overviewData);
            setCustomers(customerData || []);
        } catch (error) {
            console.error(error);
        } finally{
            setLoading(false);
        }
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
            lineNumber: 102,
            columnNumber: 7
        }, this);
    }
    if (!authorized) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "p-6",
            children: "Unauthorized"
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
            lineNumber: 110,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-4 space-y-5 pb-24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold",
                        children: "SaaS Dashboard"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 120,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-500",
                        children: "AquaOps Control Center"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                lineNumber: 119,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 gap-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Factories"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 134,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-[#0d1b3e]",
                                children: overview?.total_factories || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 138,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Active Trials"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-green-600",
                                children: overview?.active_trials || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 143,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Premium Factories"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-purple-600",
                                children: overview?.premium_factories || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Payments"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-[#0d1b3e]",
                                children: overview?.total_payments || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 168,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 163,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Revenue"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-green-600",
                                children: [
                                    "₦",
                                    Number(overview?.total_revenue || 0).toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 173,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Expiring Soon"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-orange-500",
                                children: overview?.expiring_soon || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-white rounded-2xl p-4 shadow-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-gray-500",
                                children: "Expired Trials"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 197,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-red-600",
                                children: overview?.expired_trials || 0
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 201,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 196,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                lineNumber: 131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-4 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-3",
                        children: "Quick Actions"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-blue-600 text-white rounded-xl py-3 font-medium",
                                children: "Customers"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 218,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>onNavigate?.("admin-subscriptions"),
                                className: "bg-purple-600 text-white rounded-xl py-3 font-medium",
                                children: "Subscriptions"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 224,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-green-600 text-white rounded-xl py-3 font-medium",
                                children: "Payments"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "bg-[#0d1b3e] text-white rounded-xl py-3 font-medium",
                                children: "Revenue"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 241,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                lineNumber: 210,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-4 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-3",
                        children: "Recent Signups"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: customers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "border-b pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "font-medium",
                                        children: customer.factory_name
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                        lineNumber: 269,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-gray-500",
                                        children: [
                                            "Joined",
                                            " ",
                                            new Date(customer.signup_date).toLocaleDateString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                        lineNumber: 275,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, customer.factory_name, true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 263,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 259,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                lineNumber: 253,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white rounded-2xl p-4 shadow-sm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold mb-3",
                        children: "Trial Status"
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 293,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: customers.map((customer)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-center border-b pb-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "font-medium",
                                                children: customer.factory_name
                                            }, void 0, false, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-xs text-gray-500",
                                                children: [
                                                    "Ends",
                                                    " ",
                                                    new Date(customer.trial_end_date).toLocaleDateString()
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                                lineNumber: 315,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                        lineNumber: 308,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: `text-xs px-2 py-1 rounded-full ${customer.trial_state === "Active Trial" ? "bg-green-100 text-green-700" : customer.trial_state === "Expiring Soon" ? "bg-orange-100 text-orange-700" : "bg-red-100 text-red-700"}`,
                                        children: customer.trial_state
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                        lineNumber: 323,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, customer.factory_name + "-trial", true, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                                lineNumber: 301,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                        lineNumber: 297,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
                lineNumber: 291,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx",
        lineNumber: 117,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WaterFactoryApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/dashboard.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$production$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/production.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$sales$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/sales.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$expenses$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/expenses.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$debts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/debts.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$bottom$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/bottom-nav.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/factory.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$reports$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/reports.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$loans$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/loans.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$bank$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/bank.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$account$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/account.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/contexts/AuthContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$protected$2d$route$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/protected-route.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$admin$2d$subscriptions$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-subscriptions.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$history$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/history.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$current$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/current-factory.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$admin$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/screens/admin-dashboard.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
function WaterFactoryApp() {
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("dashboard");
    const [factoryName, setFactoryNameState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    // GLOBAL AUTH
    const { user, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$contexts$2f$AuthContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    // LOAD FACTORY
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const loadFactory = async ()=>{
            try {
                // WAIT FOR AUTH HYDRATION
                if (loading) return;
                // NO USER
                if (!user) {
                    // SEND TO MAIN ENTRY FLOW
                    router.push("/");
                    return;
                }
                // GET CURRENT FACTORY
                const factory = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$current$2d$factory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getCurrentFactory"])();
                // FACTORY FOUND
                if (factory) {
                    setFactoryNameState(factory.name);
                    // OPTIONAL UI CACHE
                    localStorage.setItem("factoryName", factory.name);
                    // KEEP EXISTING TRIAL LOGIC
                    if (!localStorage.getItem("trialStart")) {
                        localStorage.setItem("trialStart", new Date().toISOString());
                    }
                    return;
                }
                // NO FACTORY FOUND
                // RETURN TO ENTRY FLOW
                router.push("/");
            } catch (err) {
                console.error(err);
                router.push("/");
            }
        };
        loadFactory();
    }, [
        user,
        loading,
        router
    ]);
    // WAIT FOR AUTH
    if (loading) {
        return null;
    }
    // WAIT FOR FACTORY
    if (!factoryName) {
        return null;
    }
    // SCREEN RENDERER
    const renderScreen = ()=>{
        if (activeTab === "dashboard") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dashboard"], {
                setActiveTab: setActiveTab
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 124,
                columnNumber: 9
            }, this);
        }
        if (activeTab === "production") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$production$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Production"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 135,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "sales") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$sales$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Sales"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 141,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "expenses") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$expenses$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Expenses"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 147,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "debts") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$debts$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Debts"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 153,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "reports") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$reports$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Reports"], {
                setActiveTab: setActiveTab
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this);
        }
        if (activeTab === "loans") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$loans$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Loans"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 171,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "bank") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$bank$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Bank"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 177,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "account") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$account$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AccountScreen"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 183,
                columnNumber: 14
            }, this);
        }
        if (activeTab === "history") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$history$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["HistoryScreen"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 189,
                columnNumber: 10
            }, this);
        }
        if (activeTab === "admin-dashboard") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$admin$2d$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminDashboard"], {
                onNavigate: setActiveTab
            }, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 197,
                columnNumber: 4
            }, this);
        }
        if (activeTab === "admin-subscriptions") {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$admin$2d$subscriptions$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AdminSubscriptions"], {}, void 0, false, {
                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                lineNumber: 208,
                columnNumber: 5
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$screens$2f$dashboard$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dashboard"], {
            setActiveTab: setActiveTab
        }, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 213,
            columnNumber: 7
        }, this);
    };
    // MAIN APP
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$protected$2d$route$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProtectedRoute"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-screen bg-[#eef0f5] max-w-md mx-auto flex flex-col overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center justify-between px-4 py-3 bg-white shadow-sm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                    src: "/icon-192.png",
                                    alt: "AquaOps Logo",
                                    className: "w-8 h-8 rounded"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                    lineNumber: 233,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-sm font-bold text-[#0d1b3e]",
                                            children: "AquaOps"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                            lineNumber: 241,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-gray-400",
                                            children: factoryName
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                            lineNumber: 245,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                    lineNumber: 239,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                            lineNumber: 231,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setActiveTab("account");
                                    },
                                    className: "text-xs bg-[#0d1b3e] text-white px-3 py-1.5 rounded-lg",
                                    children: "Account"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setActiveTab("admin-dashboard"),
                                    className: "text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg",
                                    children: "Admin"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                    lineNumber: 268,
                                    columnNumber: 1
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const newName = prompt("Enter new factory name");
                                        if (newName && newName.trim() !== "") {
                                            (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["setFactoryName"])(newName);
                                            setFactoryNameState(newName);
                                        }
                                    },
                                    className: "text-xs bg-gray-200 px-3 py-1.5 rounded-lg",
                                    children: "Change"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                                    lineNumber: 280,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                            lineNumber: 253,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-y-auto px-2 py-1",
                    children: renderScreen()
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                    lineNumber: 312,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$bottom$2d$nav$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BottomNav"], {
                    activeTab: activeTab,
                    setActiveTab: setActiveTab
                }, void 0, false, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
                    lineNumber: 317,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
            lineNumber: 225,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx",
        lineNumber: 223,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AquaOpsEntry",
    ()=>AquaOpsEntry
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/factory.js [app-ssr] (ecmascript) <export default as Factory>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-ssr] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/lucide-react/dist/esm/icons/droplets.js [app-ssr] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AquaOpsEntry() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isLogin, setIsLogin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [factoryName, setFactoryName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const handleSubmit = async ()=>{
        try {
            setLoading(true);
            // LOGIN
            if (isLogin) {
                const { data: authData, error } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signInWithPassword({
                    email,
                    password
                });
                if (error) {
                    setLoading(false);
                    if (error.message.toLowerCase().includes("invalid login credentials")) {
                        alert("Account not found. Please create an account first.");
                    } else {
                        alert(error.message);
                    }
                    return;
                }
                console.log("LOGIN SUCCESS:", authData);
                const { data: membership } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factory_users").select("factory_id").eq("user_id", authData.user.id).single();
                console.log("MEMBERSHIP:", membership);
                // GIVE SUPABASE SESSION TIME
                setTimeout(()=>{
                    window.location.href = "/aquaops";
                }, 1200);
                return;
            }
            // SIGNUP
            if (!factoryName || !email || !password) {
                alert("Please complete all fields");
                return;
            }
            // CREATE ACCOUNT
            const { data: signupData, error: signupError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.signUp({
                email,
                password
            });
            if (signupError) {
                alert(signupError.message);
                return;
            }
            const user = signupData.user;
            if (!user) {
                alert("Account creation failed");
                return;
            }
            // CREATE FACTORY
            const { data: newFactory, error: factoryError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factories").insert({
                user_id: user.id,
                name: factoryName,
                currency_code: "NGN",
                currency_symbol: "₦"
            }).select("id").single();
            if (factoryError || !newFactory) {
                alert(factoryError?.message || "Factory creation failed");
                return;
            }
            // CREATE MEMBERSHIP
            const { error: membershipError } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].from("factory_users").insert({
                factory_id: newFactory.id,
                user_id: user.id,
                role: "owner"
            });
            if (membershipError) {
                alert(membershipError.message);
                return;
            }
            localStorage.setItem("factoryName", factoryName);
            alert("Account created successfully. Please verify your email before login.");
            setIsLogin(true);
        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        } finally{
            setLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#eef0f5]",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-md mx-auto px-4 pt-5 pb-16 space-y-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-center",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/icon-192.png",
                                alt: "AquaOps",
                                className: "w-16 h-16 rounded-2xl shadow-sm"
                            }, void 0, false, {
                                fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                lineNumber: 213,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 212,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-3xl sm:text-4xl font-bold text-[#0d1b3e] leading-tight",
                                    children: "Stop guessing your business numbers"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 221,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-center mt-3",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                        width: "90",
                                        height: "8",
                                        viewBox: "0 0 120 12",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            d: "M4 8 Q60 0 116 8",
                                            stroke: "#f5a623",
                                            strokeWidth: "2",
                                            fill: "none",
                                            strokeLinecap: "round"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                        lineNumber: 226,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 225,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 mt-3 text-base leading-relaxed",
                                    children: "Track your production, sales, expenses, debts and profit in one operational dashboard."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 241,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 220,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                    lineNumber: 210,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "bg-[#0d1b3e] text-white rounded-3xl p-4 shadow-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm opacity-70",
                                    children: "AquaOps"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 257,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-semibold mt-1 leading-snug",
                                    children: "Built for water factories to manage daily operations from anywhere."
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 261,
                                    columnNumber: 5
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 255,
                            columnNumber: 3
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                            size: 18,
                                            className: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 271,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Expenses"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 277,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: "Track costs"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 281,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 276,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 270,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                            size: 18,
                                            className: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 288,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Reports"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 294,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: "Profit insights"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 298,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 293,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 287,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$factory$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Factory$3e$__["Factory"], {
                                            size: 18,
                                            className: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 305,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Production"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 311,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: "Factory output"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 315,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 310,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 304,
                                    columnNumber: 5
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-white rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {
                                            size: 18,
                                            className: "text-blue-600"
                                        }, void 0, false, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 322,
                                            columnNumber: 7
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-medium",
                                                    children: "Debts"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 328,
                                                    columnNumber: 9
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[11px] text-gray-500",
                                                    children: "Reduce debt"
                                                }, void 0, false, {
                                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                                    lineNumber: 332,
                                                    columnNumber: 9
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                            lineNumber: 327,
                                            columnNumber: 7
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 321,
                                    columnNumber: 5
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 268,
                            columnNumber: 3
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                    lineNumber: 252,
                    columnNumber: 1
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-3xl p-4 shadow-sm space-y-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-2xl font-bold text-[#0d1b3e]",
                                    children: isLogin ? "Welcome back" : "Start Free Trial"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 346,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-gray-500 mt-1",
                                    children: isLogin ? "Login to continue managing your factory" : "Create your account to start"
                                }, void 0, false, {
                                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                                    lineNumber: 352,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 345,
                            columnNumber: 11
                        }, this),
                        !isLogin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "text",
                            placeholder: "Factory Name",
                            value: factoryName,
                            onChange: (e)=>setFactoryName(e.target.value),
                            className: "w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 360,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "email",
                            placeholder: "Email Address",
                            value: email,
                            onChange: (e)=>setEmail(e.target.value),
                            className: "w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 373,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "password",
                            placeholder: "Password",
                            value: password,
                            onChange: (e)=>setPassword(e.target.value),
                            onKeyDown: (e)=>{
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            },
                            className: "w-full p-4 rounded-2xl border border-gray-200 outline-none"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 383,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: handleSubmit,
                            disabled: loading,
                            className: "w-full bg-[#0d1b3e] text-white py-4 rounded-2xl font-medium",
                            children: loading ? "Please wait..." : isLogin ? "Login" : "Start Free Trial"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 400,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            onClick: ()=>setIsLogin(!isLogin),
                            className: "text-sm text-center text-blue-600 cursor-pointer",
                            children: isLogin ? "Don't have an account? Start free trial" : "Already have an account? Login"
                        }, void 0, false, {
                            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                            lineNumber: 412,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
                    lineNumber: 343,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
            lineNumber: 207,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx",
        lineNumber: 204,
        columnNumber: 5
    }, this);
}
}),
"[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/aquaops/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AquaOpsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/lib/supabase.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$water$2d$factory$2d$app$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/water-factory-app.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$aquaops$2d$entry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/components/aquaops-entry.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function AquaOpsPage() {
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [authenticated, setAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const checkAuth = async ()=>{
            try {
                const { data: { user } } = await __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$lib$2f$supabase$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["supabase"].auth.getUser();
                setAuthenticated(!!user);
            } catch (error) {
                console.error(error);
            } finally{
                setLoading(false);
            }
        };
        checkAuth();
    }, []);
    if (loading) {
        return null;
    }
    // NOT LOGGED IN
    if (!authenticated) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$aquaops$2d$entry$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AquaOpsEntry"], {}, void 0, false, {
            fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/aquaops/page.tsx",
            lineNumber: 44,
            columnNumber: 12
        }, this);
    }
    // LOGGED IN
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$PROJECTS$2f$AquaOps$2d$clean$2f$AquaOps$2d$clean$2f$components$2f$water$2d$factory$2d$app$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/Documents/PROJECTS/AquaOps-clean/AquaOps-clean/app/aquaops/page.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=Documents_PROJECTS_AquaOps-clean_AquaOps-clean_0kbwrkt._.js.map