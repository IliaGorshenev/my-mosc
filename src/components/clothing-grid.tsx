import React from 'react';

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
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-1.svg',
    colors: ['#BD93FF', '#FFFFFF', '#64ACFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 2,
    name: 'Футболка оверсайз МОСКВА',
    image: '/clothes-2.svg',
    colors: ['#E60528', '#64ACFF', '#BD93FF'],
    sizes: { XS: 1, S: 1, M: 2, L: 2, XL: 2 },
  },
  {
    id: 3,
    name: 'Лонгслив мужской МОСКВА',
    image: '/clothes-3.svg',
    colors: ['#E60528'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 4,
    name: 'Худи оверсайз МОСКВА',
    image: '/clothes-4.svg',
    colors: ['#FFC0CB', '#FFFFFF', '#000000'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
  {
    id: 5,
    name: 'Толстовка на молнии МОСКВА',
    image: '/clothes-5.svg',
    colors: ['#BD93FF', '#000000', '#FFFFFF'],
    sizes: { XS: 2, S: 2, M: 2, L: 1, XL: 1 },
  },
  {
    id: 6,
    name: 'Бомбер на кнопках МОСКВА',
    image: '/clothes-6.svg',
    colors: ['#000000', '#FFFFFF', '#BD93FF'],
    sizes: { XS: 1, S: 2, M: 1, L: 2, XL: 2 },
  },
  {
    id: 9,
    name: 'Детский костюм космонавта',
    image: '/clothes-9.svg',
    colors: ['#000000', '#FFFFFF', '#E60528'],
    sizes: { XS: 5, S: 5, M: 5, L: 5, XL: 5 },
    isSpecial: true, // Mark this as a special item
  },
];

const ColorSwatch: React.FC<{ color: string }> = ({ color }) => (
  <div
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '999px',
      backgroundColor: color,
      border: '2px solid #B2B2B2',
    }}
  />
);
const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  // Calculate total quantity for this product
  const totalQuantity = Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0);

  // Special styling for the special item
  if (product.isSpecial) {
    return (
      <div
        style={{
          display: 'flex',
          padding: '40px',
          paddingLeft: '0',

          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '40px',
          borderRadius: '40px',
          border: '3px solid #DBDBDB',
          background: '#FFF',
          boxSizing: 'border-box',
          height: '100%',
          maxHeight: '100%',
        }}>
        {/* Header with name */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            padding: '10px 20px',
            paddingRight: 0,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '5px',
            alignSelf: 'stretch',
            paddingLeft: '40px',
          }}>
          <h3
            style={{
              color: '#000',
              fontFamily: 'Inter',
              fontSize: '50px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
              margin: 0,
            }}>
            {product.name}
          </h3>
          <div
            style={{
              backgroundColor: '#E60528',
              color: 'white',
              padding: '10px 20px',
              aspectRatio: 1 / 1,
              display: 'flex',
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
              fontFamily: 'Inter',
              fontSize: '32px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '120%',
            }}>
            <span style={{ margin: 'auto' }}>
              {' '}
              {Object.values(product.sizes).reduce((sum, qty) => sum + qty, 0)} шт.
            </span>
          </div>
        </div>
        {/* Content area with image and details */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 24%',
            width: '100%',
            height: '100%',
            gap: '30px',
          }}>
          {/* Left - Product image */}
          <div
            style={{
              flex: '0 0 40%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                objectFit: 'contain',
                objectPosition: 'left bottom',
                marginLeft: 0,
                maxHeight: '1104px',
              }}
            />
          </div>

          {/* Right - Product details */}
          <div
            style={{
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '30px',
              alignSelf: 'flex-end',
              position: 'relative',
            }}>
            <div
              style={{
                display: 'flex',
                gap: '30px',
                flexDirection: 'column',
                position: 'absolute',
                bottom: '-40px',
                right: '20px',
                width: '150%',
              }}>
              {/* Colors */}
              <div>
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    marginLeft: 'auto',
                    justifyContent: 'flex-end',
                  }}>
                  {product.colors.map((color, index) => (
                    <ColorSwatch key={index} color={color} />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div
                style={{
                  marginBottom: '40px',
                }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    gap: '10px',
                  }}>
                  {Object.entries(product.sizes).map(([size, quantity], index, array) => (
                    <>
                      <div
                        key={size}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          gap: '10px',
                        }}>
                        <div
                          style={{
                            fontSize: '50px',
                            fontWeight: ' 400',
                            lineHeight: '120%',
                            color: '#000',
                            fontFamily: 'Inter',
                            fontStyle: 'normal',
                          }}>
                          {size}
                        </div>
                        <div
                          style={{
                            color: quantity === 0 ? '#E60528' : '#000',
                            fontFamily: 'Inter',
                            fontSize: '32px',
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '120%',
                          }}>
                          {quantity}{' '}
                          <span
                            style={{
                              color: '#000',
                              fontFamily: 'Inter',
                              fontSize: '32px',
                              fontStyle: 'normal',
                              fontWeight: 400,
                              lineHeight: '120%',
                              opacity: 0.4,
                            }}>
                            шт.
                          </span>
                        </div>
                      </div>

                      {index < array.length - 1 && (
                        <div
                          style={{
                            height: '2px',
                            alignSelf: 'stretch',
                            borderRadius: '999px',
                            opacity: 0.1,
                            background: '#000',
                          }}
                        />
                      )}
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Regular product card (existing code)
  return (
    <div
      style={{
        display: 'flex',
        padding: '40px',
        paddingLeft: '0',
        paddingBottom: '0',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '40px',
        rowGap: '130px',
        alignSelf: 'stretch',
        borderRadius: '40px',
        border: '3px solid #DBDBDB',
        background: '#FFF',
      }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          padding: '10px 20px',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '5px',
          alignSelf: 'stretch',
          paddingLeft: '40px',
        }}>
        <h3
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '40px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            margin: 0,
          }}>
          {product.name}
        </h3>
        <div
          style={{
            backgroundColor: '#E60528',
            color: 'white',
            padding: '20px',
            aspectRatio: 1 / 1,
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: '20px',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
          }}>
          <span style={{ margin: 'auto' }}> {totalQuantity} шт.</span>{' '}
        </div>
      </div>
      {/* Content area with image and details */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 32%',
          width: '100%',
          gap: '30px',
        }}>
        {/* Left - Product image */}
        <div
          style={{
            flex: '0 0 40%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              objectFit: 'contain',
              objectPosition: 'left bottom',
              marginLeft: 0,
              maxHeight: '904px',
            }}
          />
        </div>

        {/* Right - Product details */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
            alignSelf: 'flex-end',
          }}>
          {/* Colors */}
          <div>
            <div
              style={{
                display: 'flex',
                gap: '20px',
                marginLeft: 'auto',
                justifyContent: 'flex-end',
              }}>
              {product.colors.map((color, index) => (
                <ColorSwatch key={index} color={color} />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div
            style={{
              marginTop: '30px',
              marginBottom: '40px',
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                gap: '10px',
              }}>
              {Object.entries(product.sizes).map(([size, quantity], index, array) => (
                <>
                  <div
                    key={size}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                    <div
                      style={{
                        color: '#000',
                        fontFamily: 'Inter',
                        fontSize: '32px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '120%',
                      }}>
                      {size}
                    </div>
                    <div
                      style={{
                        color: quantity === 0 ? '#E60528' : '#000',
                        fontFamily: 'Inter',
                        fontSize: '32px',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '120%',
                      }}>
                      {quantity}{' '}
                      <span
                        style={{
                          color: '#000',
                          fontFamily: 'Inter',
                          fontSize: '32px',
                          fontStyle: 'normal',
                          fontWeight: 400,
                          lineHeight: '120%',
                          opacity: 0.4,
                        }}>
                        шт.
                      </span>
                    </div>
                  </div>

                  {index < array.length - 1 && (
                    <div
                      style={{
                        height: '2px',
                        alignSelf: 'stretch',
                        borderRadius: '999px',
                        opacity: 0.1,
                        background: '#000',
                      }}
                    />
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ClothingGrid: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [clothesData, setClothesData] = React.useState<Product[]>(products);

  React.useEffect(() => {
    const fetchClothes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/clothes');

        if (!response.ok) {
          throw new Error('Failed to fetch clothes data');
        }

        const data = await response.json();

        // Transform the API data to match our Product interface
        const transformedData: Product[] = data.map((item: any, index: number) => {
          // Extract colors from the API response
          const colors = Array.isArray(item.colors)
            ? item.colors
            : typeof item.colors === 'string'
              ? item.colors.split(',').map(
                  // @ts-ignore
                  (color) => {
                    // Map color names to hex codes
                    switch (color.trim().toLowerCase()) {
                      case 'red':
                        return '#E60528';
                      case 'blue':
                        return '#64ACFF';
                      case 'white':
                        return '#FFFFFF';
                      case 'black':
                        return '#000000';
                      case 'purple':
                        return '#BD93FF';
                      case 'pink':
                        return '#FFC0CB';
                      default:
                        return '#000000';
                    }
                  },
                )
              : ['#000000'];

          // Transform sizes array to Size object
          const sizes: Size = { XS: 0, S: 0, M: 0, L: 0, XL: 0 };
          if (Array.isArray(item.sizes)) {
            item.sizes.forEach((sizeItem: { size: string; amount: number }) => {
              if (sizeItem.size in sizes) {
                sizes[sizeItem.size as keyof Size] = sizeItem.amount;
              }
            });
          }

          return {
            id: index + 1,
            name: item.name || `Product ${index + 1}`,
            image: `/clothes-${index + 1}.svg`, // Use existing images
            colors,
            sizes,
            // Preserve the special item
            isSpecial: index === 8, // This would be the 9th item (index 8)
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
      } finally {
        setLoading(false);
      }
    };

    fetchClothes();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}>
      {/* Products grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '24px' }}>Загрузка данных...</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '50px',
            marginBottom: '24px',
          }}>
          {clothesData.map((product) => (
            <div
              key={product.id}
              style={{
                gridColumn: product.isSpecial ? '4' : 'auto', // Position special item in the right column
                gridRow: product.isSpecial ? '1 / span 2' : 'auto', // Start from row 2 and span 2 rows
              }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
