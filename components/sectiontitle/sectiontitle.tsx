import Image from "next/image";

const SectionTitle = ({ title }: { title: string }) => {
  return (
    <div className="products__icon">
      <Image src="/icon.png" alt="juguetes" width={96} height={96} />
      <h2 className="section__title">{title}</h2>
    </div>
  );
};

export default SectionTitle;
