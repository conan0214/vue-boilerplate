import { nextTick, onMounted, onActivated } from "vue";

// ==== isNumber  函数====
const toString = Object.prototype.toString;

export function is(val, type) {
    return toString.call(val) === `[object ${type}]`;
}

export function isNumber(val) {
    return is(val, "Number");
}

let unique = 0;
// ==== buildShortUUID  函数====
export function buildShortUUID(prefix = "") {
    const time = Date.now();
    const random = Math.floor(Math.random() * 1000000000);
    unique++;
    return prefix + "_" + random + unique + String(time);
}

// ==== onMountedOrActivated  hook====
export function onMountedOrActivated(hook) {
    let mounted;
    onMounted(() => {
        hook();
        nextTick(() => {
            mounted = true;
        });
    });
    onActivated(() => {
        if (mounted) {
            hook();
        }
    });
}
