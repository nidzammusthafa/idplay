(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/SearchBox.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
const SearchBox = ({ onLocationSelect, onError })=>{
    _s();
    const [query, setQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [suggestions, setSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [showSuggestions, setShowSuggestions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const searchTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const searchBoxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Close suggestions when clicking outside
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SearchBox.useEffect": ()=>{
            const handleClickOutside = {
                "SearchBox.useEffect.handleClickOutside": (event)=>{
                    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                        setShowSuggestions(false);
                    }
                }
            }["SearchBox.useEffect.handleClickOutside"];
            document.addEventListener("mousedown", handleClickOutside);
            return ({
                "SearchBox.useEffect": ()=>{
                    document.removeEventListener("mousedown", handleClickOutside);
                }
            })["SearchBox.useEffect"];
        }
    }["SearchBox.useEffect"], []);
    const handleSearch = async (searchQuery)=>{
        if (!searchQuery.trim()) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch search results");
            }
            // For now, we'll just use the first result
            // In a more advanced implementation, we could show suggestions
            if (data.lat && data.lon) {
                onLocationSelect({
                    lat: data.lat,
                    lng: data.lon
                });
                setQuery("");
                setShowSuggestions(false);
            } else {
                onError("Lokasi tidak ditemukan");
            }
        } catch (error) {
            console.error("Search error:", error);
            onError(error instanceof Error ? error.message : "Terjadi kesalahan saat mencari lokasi");
        } finally{
            setIsLoading(false);
        }
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        if (query.trim()) {
            handleSearch(query);
        }
    };
    const handleSuggestionClick = (suggestion)=>{
        onLocationSelect({
            lat: suggestion.lat,
            lng: suggestion.lon
        });
        setQuery(suggestion.name);
        setShowSuggestions(false);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: searchBoxRef,
        className: "relative w-full max-w-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                onSubmit: handleSubmit,
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "text",
                                value: query,
                                onChange: (e)=>setQuery(e.target.value),
                                placeholder: "Cari alamat, kota, atau tempat...",
                                className: "w-full px-4 py-3 pl-12 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm bg-slate-50/80",
                                disabled: isLoading
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 102,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "h-5 w-5 text-gray-400",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 20 20",
                                    fill: "currentColor",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                        fillRule: "evenodd",
                                        d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z",
                                        clipRule: "evenodd"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/SearchBox.tsx",
                                        lineNumber: 117,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SearchBox.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 110,
                                columnNumber: 11
                            }, this),
                            isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                    className: "animate-spin h-5 w-5 text-gray-500",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    fill: "none",
                                    viewBox: "0 0 24 24",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                                            className: "opacity-25",
                                            cx: "12",
                                            cy: "12",
                                            r: "10",
                                            stroke: "currentColor",
                                            strokeWidth: "4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SearchBox.tsx",
                                            lineNumber: 132,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                            className: "opacity-75",
                                            fill: "currentColor",
                                            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/SearchBox.tsx",
                                            lineNumber: 140,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/SearchBox.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 125,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 101,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "submit",
                        className: "absolute inset-y-0 right-0 pr-3 flex items-center",
                        disabled: isLoading,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "sr-only",
                            children: "Cari"
                        }, void 0, false, {
                            fileName: "[project]/src/components/SearchBox.tsx",
                            lineNumber: 154,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/SearchBox.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 100,
                columnNumber: 7
            }, this),
            showSuggestions && suggestions.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                    className: "max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm",
                    children: suggestions.map((suggestion, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                            className: "cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-blue-50",
                            onClick: ()=>handleSuggestionClick(suggestion),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-normal block truncate",
                                    children: suggestion.name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/SearchBox.tsx",
                                    lineNumber: 169,
                                    columnNumber: 19
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/SearchBox.tsx",
                                lineNumber: 168,
                                columnNumber: 17
                            }, this)
                        }, index, false, {
                            fileName: "[project]/src/components/SearchBox.tsx",
                            lineNumber: 163,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/components/SearchBox.tsx",
                    lineNumber: 161,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/SearchBox.tsx",
                lineNumber: 160,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/SearchBox.tsx",
        lineNumber: 99,
        columnNumber: 5
    }, this);
};
_s(SearchBox, "sZCJdRtdULZJtUwfbCm/aQ/DEws=");
_c = SearchBox;
const __TURBOPACK__default__export__ = SearchBox;
var _c;
__turbopack_context__.k.register(_c, "SearchBox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/MapPicker.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
// components/Contact/MapPicker.tsx
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Marker.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/leaflet/dist/leaflet-src.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/SearchBox.tsx [app-client] (ecmascript)"); // Import SearchBox component
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature();
;
;
;
;
// User's selected location marker icon
const userIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [
        25,
        41
    ],
    iconAnchor: [
        12,
        41
    ],
    popupAnchor: [
        1,
        -34
    ],
    shadowSize: [
        41,
        41
    ]
});
// ODP location marker icon
const odpIcon = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].icon({
    iconUrl: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDYzRkYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNSAxMi41NWEzIDExIDAgMCAxIDE0LjA4IDAiPjwvcGF0aD48cGF0aCBkPSJNMS40MiA5YTE2IDE2IDAgMCAxIDIxLjE2IDAiPjwvcGF0aD48cGF0aCBkPSJNOC41MyAxNi4xMWE2IDYgMCAwIDEgNi45NSAwIj48L3BhdGg+PGxpbmUgeDE9IjEyIiB5MT0iMjAiIHgyPSIxMi4wMSIgeTI9IjIwIj48L2xpbmU+PC9zdmc+",
    iconSize: [
        32,
        32
    ],
    iconAnchor: [
        16,
        32
    ],
    popupAnchor: [
        0,
        -32
    ]
});
// Helper component to handle map clicks
const MapClickHandler = ({ onLocationSelect })=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"])({
        click (e) {
            onLocationSelect(e.latlng);
        }
    });
    return null;
};
_s(MapClickHandler, "Ld/tk8Iz8AdZhC1l7acENaOEoCo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"]
    ];
});
_c = MapClickHandler;
// Helper component to update map view when position changes
const MapViewUpdater = ({ position })=>{
    _s1();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapViewUpdater.useEffect": ()=>{
            if (position) {
                map.flyTo([
                    position.lat,
                    position.lng
                ], 16); // Zoom in closer
            }
        }
    }["MapViewUpdater.useEffect"], [
        position,
        map
    ]);
    return null;
};
_s1(MapViewUpdater, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c1 = MapViewUpdater;
// Helper component to handle map events for performance and stability
const MapEventsHandler = ({ allOdps, setVisibleOdps })=>{
    _s2();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"])();
    const updateVisibleMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "MapEventsHandler.useCallback[updateVisibleMarkers]": ()=>{
            if (!map || allOdps.length === 0) return;
            const bounds = map.getBounds();
            const visible = allOdps.filter({
                "MapEventsHandler.useCallback[updateVisibleMarkers].visible": (odp)=>{
                    const latLng = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$leaflet$2f$dist$2f$leaflet$2d$src$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].latLng(odp.center.lat, odp.center.lng);
                    return bounds.contains(latLng);
                }
            }["MapEventsHandler.useCallback[updateVisibleMarkers].visible"]);
            setVisibleOdps(visible);
        }
    }["MapEventsHandler.useCallback[updateVisibleMarkers]"], [
        map,
        allOdps,
        setVisibleOdps
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapEventsHandler.useEffect": ()=>{
            // Invalidate map size on initial load and resize to fix rendering issues
            const handleResize = {
                "MapEventsHandler.useEffect.handleResize": ()=>map.invalidateSize()
            }["MapEventsHandler.useEffect.handleResize"];
            // Use a short timeout to ensure the map container has its final dimensions
            const timer = setTimeout({
                "MapEventsHandler.useEffect.timer": ()=>{
                    map.invalidateSize();
                    updateVisibleMarkers();
                }
            }["MapEventsHandler.useEffect.timer"], 150);
            window.addEventListener("resize", handleResize);
            return ({
                "MapEventsHandler.useEffect": ()=>{
                    clearTimeout(timer);
                    window.removeEventListener("resize", handleResize);
                }
            })["MapEventsHandler.useEffect"];
        }
    }["MapEventsHandler.useEffect"], [
        map,
        updateVisibleMarkers
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"])({
        moveend: updateVisibleMarkers,
        zoomend: updateVisibleMarkers
    });
    return null;
};
_s2(MapEventsHandler, "OD21/0ykYGaVrvn4rYIztUSgOvw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMap"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMapEvents"]
    ];
});
_c2 = MapEventsHandler;
const MapPicker = ({ selectedPosition, onLocationSelect })=>{
    _s3();
    const [allOdpLocations, setAllOdpLocations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [visibleOdps, setVisibleOdps] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [searchError, setSearchError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null); // State for search errors
    // Center near ODP locations
    const initialCenter = {
        lat: -6.9175,
        lng: 107.6191
    };
    const initialZoom = 15;
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapPicker.useEffect": ()=>{
            const fetchOdpData = {
                "MapPicker.useEffect.fetchOdpData": async ()=>{
                    try {
                        const response = await fetch("/odp-locations.json");
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        const data = await response.json();
                        setAllOdpLocations(data);
                    } catch (error) {
                        console.error("Failed to fetch ODP locations:", error);
                    }
                }
            }["MapPicker.useEffect.fetchOdpData"];
            fetchOdpData();
        }
    }["MapPicker.useEffect"], []);
    return(// Wrapper div for positioning the search box relative to the map
    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MapContainer"], {
                center: initialCenter,
                zoom: initialZoom,
                scrollWheelZoom: true,
                className: "h-full w-full z-0" // z-0 ensures map is behind other overlays
                ,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 146,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapClickHandler, {
                        onLocationSelect: onLocationSelect
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 150,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapViewUpdater, {
                        position: selectedPosition
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 151,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapEventsHandler, {
                        allOdps: allOdpLocations,
                        setVisibleOdps: setVisibleOdps
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 152,
                        columnNumber: 9
                    }, this),
                    selectedPosition && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                        position: selectedPosition,
                        icon: userIcon,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                            children: [
                                "Lokasi Pilihan Anda ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/src/components/MapPicker.tsx",
                                    lineNumber: 161,
                                    columnNumber: 35
                                }, this),
                                " Lat: ",
                                selectedPosition.lat.toFixed(6),
                                ", Lng: ",
                                selectedPosition.lng.toFixed(6)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/MapPicker.tsx",
                            lineNumber: 160,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 159,
                        columnNumber: 11
                    }, this),
                    visibleOdps.map((odp, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Marker$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Marker"], {
                            position: odp.center,
                            icon: odpIcon,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "ODP:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MapPicker.tsx",
                                        lineNumber: 171,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    odp.ODP
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MapPicker.tsx",
                                lineNumber: 170,
                                columnNumber: 13
                            }, this)
                        }, index, false, {
                            fileName: "[project]/src/components/MapPicker.tsx",
                            lineNumber: 169,
                            columnNumber: 11
                        }, this))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MapPicker.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-4 left-1/2 -translate-x-1/2 z-10 w-11/12 md:w-2/3 lg:w-1/2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$SearchBox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        onLocationSelect: onLocationSelect,
                        onError: setSearchError
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this),
                    searchError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-2 p-2 bg-red-100 text-red-700 text-sm rounded-md shadow-sm",
                        children: searchError
                    }, void 0, false, {
                        fileName: "[project]/src/components/MapPicker.tsx",
                        lineNumber: 184,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MapPicker.tsx",
                lineNumber: 178,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MapPicker.tsx",
        lineNumber: 139,
        columnNumber: 5
    }, this));
};
_s3(MapPicker, "lPykfnNPDXC3gyb7jlgjRMJ3eJA=");
_c3 = MapPicker;
const __TURBOPACK__default__export__ = MapPicker;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "MapClickHandler");
__turbopack_context__.k.register(_c1, "MapViewUpdater");
__turbopack_context__.k.register(_c2, "MapEventsHandler");
__turbopack_context__.k.register(_c3, "MapPicker");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/MapPicker.tsx [app-client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/components/MapPicker.tsx [app-client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=src_components_4a70d097._.js.map