import Banner from "@/components/banner/banner";
import SectionTitle from "@/components/sectiontitle/sectiontitle";
import ProductCard from "@/components/productCard/productCard";
import { fetchProducts } from "./lib/data";
import "react-toastify/dist/ReactToastify.css";

const Home = async () => {
  const products = await fetchProducts();

  return (
    <>
      <section>
        <div className="container">
          <Banner />
        </div>
      </section>
      <section className="container">
        <div className="products__main">
          <SectionTitle title="Nuestros productos" />
          <div className="products__container" id="products_container">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                description={product.description}
                photo={product.photo}
                price={product.price}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
