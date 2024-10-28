
import bebes from './bebes';
import discountedProducts from './descuentos';
import ninas from './ninas';
import ninos from './ninos';

const allProducts = [...discountedProducts, ...ninas, ...ninos, ...bebes];

export default allProducts;
