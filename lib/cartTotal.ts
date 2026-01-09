export const refreshCart = () => {
    window.dispatchEvent(new Event("cart-refresh"));
};
