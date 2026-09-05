function assert(name, condition) {
    if (!condition) throw new Error("FAIL: " + name);
    document.body.insertAdjacentHTML("beforeend", `<p>✓ ${name}</p>`)
} 
function validateMemory(v) { 
    return typeof v === "string" && v.trim().length > 0 
}
function apiFallback(v) { 
    return v || "fallback" 
} 
assert("rejects empty memory", validateMemory("") === false);
assert("rejects whitespace", validateMemory("   ") === false);
assert("accepts real memory", validateMemory("Beach day") === true);
assert("uses API fallback", apiFallback("") === "fallback");
document.body.insertAdjacentHTML("afterbegin", "<h1>TIMEBLOOM tests passed</h1>");
