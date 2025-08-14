import React from 'react';
import styled from 'styled-components';

interface Size {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  colors: string[];
  sizes: Size;
  isSpecial?: boolean; // Add this property to mark special items
}
const products = [
  {
    id: 1,
    name: 'Футболка оверсайз Москва',
    image: '/clothes-1.svg',
    colors: ['#BD93FF', '#FFFFFF', '#64ACFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 2,
    name: 'Футболка оверсайз Москва',
    image: '/clothes-2.svg',
    colors: ['#E60528', '#64ACFF', '#BD93FF'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: 3,
    name: 'Лонгслив мужской МОСКВА',
    image: '/clothes-3.svg',
    colors: ['#E60528'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: 4,
    name: 'Худи оверсайз Москва',
    image: '/clothes-4.svg',
    colors: ['#FFC0CB', '#FFFFFF', '#000000'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: 5,
    name: 'Толстовка на молнии Москва',
    image: '/clothes-6.svg',
    colors: ['#BD93FF', '#000000', '#FFFFFF'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: 6,
    name: 'Бомбер на кнопках Москва',
    image: '/clothes-10.svg',
    colors: ['#000000', '#FFFFFF', '#BD93FF'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
  },
  {
    id: 9,
    name: 'Детский костюм космонавта',
    image: '/clothes-9.svg',
    colors: ['#000000', '#FFFFFF', '#E60528'],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0 },
    isSpecial: true, // Mark this as a special item
  },
];

interface Size {
  XS: number;
  S: number;
  M: number;
  L: number;
  XL: number;
}

interface Product {
  id: number;
  name: string;
  image: string;
  colors: string[];
  sizes: Size;
  isSpecial?: boolean;
}

// Styled Components
const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 50px;
  margin-bottom: 24px;
`;

const ProductCardContainer = styled.div<{ isSpecial?: boolean }>`
  grid-column: ${(props) => (props.isSpecial ? '4' : 'auto')};
  grid-row: ${(props) => (props.isSpecial ? '1 / span 2' : 'auto')};
`;

const CardWrapper = styled.div<{ isSpecial?: boolean }>`
  display: flex;
  padding: 40px;
  padding-left: 0;
  padding-bottom: ${(props) => (props.isSpecial ? '0' : '0')};
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
  row-gap: ${(props) => (props.isSpecial ? '40px' : '130px')};
  align-self: stretch;
  border-radius: 40px;
  border: 3px solid #dbdbdb;
  background: #fff;
  box-sizing: border-box;
  height: ${(props) => (props.isSpecial ? '100%' : 'auto')};
  max-height: ${(props) => (props.isSpecial ? '100%' : 'auto')};
`;

const CardHeader = styled.div<{ isSpecial?: boolean }>`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 10px 20px;
  padding-right: 0;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  align-self: stretch;
  padding-left: 40px;
`;

const CardTitle = styled.h3<{ isSpecial?: boolean }>`
  color: ${(props) => (props.isSpecial ? '#000' : '#191919')};
  font-family: 'Inter';
  font-size: ${(props) => (props.isSpecial ? '64px' : '56px')};
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  margin: 0;
`;

const QuantityBadge = styled.div`
  background-color: #e60528;
  color: white;
  padding: ${(props) =>
    props.children && String(props.children).length > 2 ? '10px 20px' : '20px'};
  aspect-ratio: 1 / 1;
  display: flex;
  align-content: center;
  justify-content: center;
  border-radius: 20px;
  font-family: 'Inter';
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

const BadgeText = styled.span`
  margin: auto;
`;

const ContentArea = styled.div<{ isSpecial?: boolean }>`
  display: grid;
  grid-template-columns: 1fr ${(props) => (props.isSpecial ? '24%' : '32%')};
  width: 100%;
  height: ${(props) => (props.isSpecial ? '100%' : 'auto')};
  gap: 30px;
`;

const ImageContainer = styled.div`
  flex: 0 0 40%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img<{ isSpecial?: boolean }>`
  width: 100%;
  object-fit: contain;
  object-position: left bottom;
  margin-left: 0;
  max-height: ${(props) => (props.isSpecial ? '1704px' : '904px')};
`;

const DetailsContainer = styled.div<{ isSpecial?: boolean }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-self: flex-end;
  position: ${(props) => (props.isSpecial ? 'relative' : 'static')};
`;

const ColorsContainer = styled.div<{ isSpecial?: boolean }>`
  ${(props) =>
    props.isSpecial
      ? `
    display: flex;
    gap: 10px;
    flex-direction: column;
    position: absolute;
    bottom: 0px;
    right: 20px;
    width: 150%;
  `
      : ''}
`;

const ColorSwatchContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-left: auto;
  justify-content: flex-end;
  margin-bottom: 65px;
`;

const ColorSwatchItem = styled.div`
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background-color: ${(props) => props.color || '#000000'};
  border: 2px solid #b2b2b2;
`;

const SizesContainer = styled.div<{ isSpecial?: boolean }>`
  margin-top: ${(props) => (props.isSpecial ? '0' : '30px')};
  margin-bottom: 40px;
`;

const SizesList = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 10px;
`;

const SizeRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
`;

const SizeLabel = styled.div<{ isSpecial?: boolean }>`
  color: #000;
  font-family: 'Inter';
  font-size: ${(props) => (props.isSpecial ? '50px' : '42px')};
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

const SizeQuantity = styled.div<{ isEmpty: boolean }>`
  color: ${(props) => (props.isEmpty ? '#E60528' : '#000')};
  font-family: 'Inter';
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
`;

const QuantityUnit = styled.span`
  color: #000;
  font-family: 'Inter';
  font-size: 42px;
  font-style: normal;
  font-weight: 400;
  line-height: 120%;
  opacity: 0.4;
`;

const Divider = styled.div`
  height: 2px;
  align-self: stretch;
  border-radius: 999px;
  opacity: 0.1;
  background: #000;
`;

// Component definitions
const ColorSwatch: React.FC<{ color: string }> = ({ color }) => <ColorSwatchItem color={color} />;

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const totalQuantity = Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0);

  return (
    <CardWrapper isSpecial={product.isSpecial}>
      <CardHeader>
        <CardTitle isSpecial={product.isSpecial}>{product.name}</CardTitle>
        <QuantityBadge>
          <BadgeText>{totalQuantity} шт.</BadgeText>
        </QuantityBadge>
      </CardHeader>

      <ContentArea isSpecial={product.isSpecial}>
        <ImageContainer>
          <ProductImage src={product.image} alt={product.name} isSpecial={product.isSpecial} />
        </ImageContainer>

        <DetailsContainer isSpecial={product.isSpecial}>
          <ColorsContainer isSpecial={product.isSpecial}>
            <ColorSwatchContainer>
              {product.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </ColorSwatchContainer>

            <SizesContainer isSpecial={product.isSpecial}>
              <SizesList>
                {Object.entries(product.sizes).map(([size, quantity], index, array) => (
                  <React.Fragment key={size}>
                    <SizeRow>
                      <SizeLabel isSpecial={product.isSpecial}>{size}</SizeLabel>
                      <SizeQuantity isEmpty={quantity === 0}>
                        {quantity} <QuantityUnit>шт.</QuantityUnit>
                      </SizeQuantity>
                    </SizeRow>

                    {index < array.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </SizesList>
            </SizesContainer>
          </ColorsContainer>
        </DetailsContainer>
      </ContentArea>
    </CardWrapper>
  );
};

export const ClothingGrid: React.FC = () => {
  // @ts-ignore
  const [loading, setLoading] = React.useState(true);
  const [clothesData, setClothesData] = React.useState<Product[]>(products);
  React.useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://192.168.10.244:8001');

        if (!response.ok) {
          throw new Error('Failed to fetch clothes data');
        }

        const data = await response.json();

        // const data = [
        //   {
        //     name: 'Бомбер на кнопках Москва',
        //     sizes: [{ size: 'S-M', amount: 3 }],
        //     colors: ['red'],
        //   },
        //   {
        //     name: 'Костюм космонавта детский',
        //     sizes: [{ size: 'S', amount: 5 }],
        //     colors: ['blue', 'pink', 'gray'],
        //   },
        //   {
        //     name: 'Толстовка на молнии Москва',
        //     sizes: [{ size: 'L-XL', amount: 1 }],
        //     colors: ['milk'],
        //   },
        //   {
        //     name: 'Футболка оверсайз Москва',
        //     sizes: [{ size: 'XXL-XXXL', amount: 1 }],
        //     colors: ['red'],
        //   },
        //   {
        //     name: 'Худи оверсайз Москва',
        //     sizes: [
        //       { size: 'L-XL', amount: 2 },
        //       { size: 'S-M', amount: 2 },
        //       { size: 'XXL-XXXL', amount: 2 },
        //     ],
        //     colors: ['milk', 'red'],
        //   },
        // ];

        // Create a mapping between API product names and our hardcoded products
        const productNameMapping: Record<string, number> = {
          'футболка оверсайз москва': 2, // Will match to clothes-1.svg
          бомбер: 10, // Will match to clothes-6.svg
          'толстовка на молнии москва': 5, // Will match to clothes-5.svg
          'худи оверсайз москва': 4, // Will match to clothes-4.svg
          'костюм космонавта детский': 9, // Will match to clothes-9.svg
          'детский костюм космонавта': 9, // Alternative name
          'лонгслив мужской москва': 3, // Will match to clothes-3.svg
        };

        // Color name to hex mapping
        const colorMapping: Record<string, string> = {
          red: '#E60528',
          blue: '#64ACFF',
          white: '#FFFFFF',
          milk: '#FFFFFF',
          black: '#000000',
          purple: '#BD93FF',
          pink: '#FFC0CB',
          gray: '#808080',
        };

        // Transform the API data to match our Product interface
        const transformedData: Product[] = data.map((item: any) => {
          // Find the matching product ID based on name
          let productId = 0;
          for (const [key, value] of Object.entries(productNameMapping)) {
            if (item.name.toLowerCase().includes(key)) {
              productId = value;
              break;
            }
          }

          // If no match found, assign a default ID
          if (productId === 0) {
            productId = Math.floor(Math.random() * 8) + 1;
          }

          // Extract colors from the API response
          const colors = Array.isArray(item.colors)
            ? item.colors.map((color: string) => colorMapping[color.toLowerCase()] || '#000000')
            : typeof item.colors === 'string'
              ? item.colors.split(',').map((color: string) => {
                  const colorKey = color.trim().toLowerCase();
                  return colorMapping[colorKey] || '#000000';
                })
              : ['#000000'];

          // Transform sizes array to Size object
          const sizes: Size = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };

          if (Array.isArray(item.sizes)) {
            item.sizes.forEach((sizeItem: { size: string; amount: number }) => {
              // Handle combined sizes like "S-M" or "L-XL"
              if (sizeItem.size.includes('-')) {
                const [firstSize, secondSize] = sizeItem.size.split('-');

                // Distribute the amount between the two sizes
                if (firstSize in sizes) {
                  sizes[firstSize as keyof Size] = Math.ceil(sizeItem.amount / 2);
                }

                if (secondSize in sizes) {
                  sizes[secondSize as keyof Size] = Math.floor(sizeItem.amount / 2);
                }
              }
              // Handle sizes like "XXL-XXXL" that aren't in our Size interface
              else if (sizeItem.size.startsWith('XXL') || sizeItem.size.startsWith('XXXL')) {
                // Assign to XL as fallback
                sizes.XL += sizeItem.amount;
              }
              // Handle regular sizes
              else if (sizeItem.size in sizes) {
                sizes[sizeItem.size as keyof Size] = sizeItem.amount;
              }
            });
          }

          // Find the matching hardcoded product to get the image
          const matchingProduct = products.find((p) => p.id === productId);

          return {
            id: productId,
            name: item.name || `Одежда №${productId}`,
            image: matchingProduct ? matchingProduct.image : `/clothes-${productId}.svg`,
            colors,
            sizes,
            isSpecial: productId === 9, // Special item is the space suit
          };
        });

        // Make sure to include our special item if it's not in the API data
        if (!transformedData.some((item) => item.id === 9)) {
          transformedData.push(products.find((p) => p.id === 9)!);
        }

        setClothesData(transformedData);
      } catch (error) {
        console.error('Error fetching clothes data:', error);
        // Fallback to hardcoded data in case of error
        setClothesData(products);
      } finally {
        setLoading(false);
      }
    };

    const intervalId = setInterval(() => {
      fetchClothes();
    }, 2000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <GridContainer>
      <ProductsGrid>
        {clothesData.map((product) => (
          <ProductCardContainer key={product.id} isSpecial={product.isSpecial}>
            <ProductCard product={product} />
          </ProductCardContainer>
        ))}
      </ProductsGrid>
    </GridContainer>
  );
};
