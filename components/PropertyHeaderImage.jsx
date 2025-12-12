import Image from "next/image";


const PropertyHeaderImage = ({image}) => {

  return (
    <section>
      <div class="container-xl m-auto">
        <div class="grid grid-cols-1">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            src={image}
            alt=""
            className="object-cover h-[400px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
