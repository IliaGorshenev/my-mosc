import { BorderBlock } from '@/components/border-block';
import { ClothingGrid } from '@/components/clothing-grid';
import { ContentBlock } from '@/components/content-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { GridLayout } from '@/layouts/grid';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { ClothingItem, currentItemsAtom, stolenItemsAtom } from './clothes';
import { rfidData, rfidItems, rfidRetailData, rfidRetailItems } from './const';
import { liveIcon } from './pose-page';
const ItemNotification = ({ item }: { item: ClothingItem }) => {
  // Calculate time ago
  // const getTimeAgo = () => {
  //   const seconds = Math.floor((Date.now() - item.timestamp) / 1000);
  //   if (seconds < 60) return `${seconds} сек. назад`;
  //   const minutes = Math.floor(seconds / 60);
  //   return `${minutes} мин. назад`;
  // };

  return (
    <div
      style={{
        padding: '24px',
        borderRadius: '20px',
        backgroundColor: 'white',
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minHeight: '100%',
        }}>
        <h3
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '46px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '120%',
            margin: 0,
            marginBottom: '8px',
          }}>
          {item.name}
        </h3>
      </div>
      <p
        style={{
          color: '#E60528',
          fontFamily: 'Inter',
          fontSize: '72px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          marginBottom: 0,
        }}>
        Взят с полки, но не оплачен!
      </p>
    </div>
  );
};
export const ShelfOccupancyBlock2 = ({
  title,
  percentage,
}: {
  title: string;
  percentage: number;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '250px',
        height: '100%',
        width: '100%',
        padding: '0 40px',
        backgroundColor: '#E60528',
      }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <h2
          style={{
            color: '#ffffff',
            fontFamily: 'Inter',
            fontSize: '62px',
            fontStyle: 'normal',
            fontWeight: 500,
            lineHeight: '120%',
            margin: 0,
          }}>
          {title}
        </h2>

        <span
          style={{
            color: '#191919',
            fontFamily: 'Inter',
            fontSize: '32px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '120%',
            opacity: 0.4,
          }}></span>
      </div>

      {/* Percentage */}
      <div
        style={{
          overflow: 'hidden',
          color: '#ffffff',
          textOverflow: 'ellipsis',
          fontFamily: 'Inter',
          fontSize: '98px',
          fontStyle: 'normal',
          fontWeight: 700,
          lineHeight: '120%',
          marginTop: 'auto',
        }}>
        {percentage}
      </div>
    </div>
  );
};
const ClothesPage = () => {
  const [stolenItems, setStorenItems] = useAtom(stolenItemsAtom);
  const [currentItems, setCurrentItems] = useAtom(currentItemsAtom);
  const [lastFetchedItems, setLastFetchedItems] = useState<string[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  // Mock function to fetch items (replace with your actual API call)
  // Real function to fetch items from the API
  const fetchItems = async () => {
    try {
      // Use the same endpoint as in clothing grid
      const response = await fetch('http://192.168.10.244:8001');

      if (!response.ok) {
        throw new Error('Failed to fetch RFID data');
      }

      const data = await response.json();

      let totalCount = 0;
      if (Array.isArray(data)) {
        data.forEach((item) => {
          if (Array.isArray(item.sizes)) {
            // @ts-ignore
            item.sizes.forEach((sizeObj) => {
              totalCount += sizeObj.amount || 0;
            });
          }
        });
      }
      setTotalItemCount(totalCount);
      // Transform the API data to match our expected format
      // Assuming the API returns an array of items with IDs or names
      const itemIds = Array.isArray(data)
        ? data.map(
            (item: any) =>
              item.id || item.name || `Item${Math.random().toString(36).substring(2, 7)}`,
          )
        : [];

      return itemIds;
    } catch (error) {
      console.error('Error fetching RFID items:', error);

      // Fallback to mock data in case of error
      return [
        'Футболка оверсайз Москва',
        'Бомбер на кнопках Москва',
        'Толстовка на молнии Москва',
        'Худи оверсайз Москва',
        'Лонгслив мужской Москва',
        'Костюм космонавта детский',
        'Футболка женская Москва',
        'Толстовка женская Москва',
        'Шапка Москва',
        'Шарф Москва',
      ].slice(0, Math.floor(Math.random() * 3) + 8); // Return 8-10 items randomly
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchItems().then((items) => {
      setCurrentItems(items);
      setLastFetchedItems(items);
    });

    // Set up polling interval
    const intervalId = setInterval(async () => {
      const newItems = await fetchItems();
      setCurrentItems(newItems);
    }, 1000); // Check every 10 seconds (matching ClothingGrid)

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (lastFetchedItems.length > 0 && currentItems.length < lastFetchedItems.length) {
      // Find items that were removed
      const removedItems = lastFetchedItems.filter((item) => !currentItems.includes(item));

      // Add only the most recent removed item to stolen items list
      if (removedItems.length > 0) {
        const mostRecentItem = {
          id: Math.random().toString(36).substring(2, 9),
          name: removedItems[0], // Take just the first removed item
          timestamp: Date.now(),
        };

        // Replace the entire array with just the new item
        setStorenItems([mostRecentItem]);
      }
    }

    // Update last fetched items
    setLastFetchedItems(currentItems);
  }, [currentItems]);

  // Clean up old notifications after 5 minutes
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const thirtySecondsAgo = Date.now() - 10 * 1000;
      setStorenItems((prev) => prev.filter((item) => item.timestamp > thirtySecondsAgo));
    }, 10000); // Check every 30 seconds

    return () => clearInterval(cleanupInterval);
  }, []);

  return (
    <GridLayout
      leftSlot1={
        <Header
          text={
            <>
              {liveIcon}{' '}
              <span>
                RFID{' '}
                <span
                  style={{
                    color: '#E60528',
                    fontFamily: 'Inter',
                    fontSize: '72px',
                    fontStyle: 'normal',
                    fontWeight: 700,
                    lineHeight: '120%',
                  }}>
                  |
                </span>{' '}
                Противокражная система
              </span>
            </>
          }
        />
      }
      leftSlot2={<ClothingGrid></ClothingGrid>}
      leftSlot3={
        <ThreeColumnGrid
          slot1={
            <BorderBlock className="bg-[#E60528] w-[590px] h-full">
              <ShelfOccupancyBlock2 title="Всего товаров" percentage={totalItemCount} />
            </BorderBlock>
          }
          slot2={
            <BorderBlock className="h-full overflow-auto ">
              <div className="h-full flex flex-col">
                <h2 className="text-6xl px-4 font-bold mb-30">Мониторинг товаров</h2>
                {stolenItems.length > 0 ? (
                  <ItemNotification key={stolenItems[0].id} item={stolenItems[0]} />
                ) : (
                  <p className="text-gray-500 text-4xl mt-auto">Все товары на месте</p>
                )}
              </div>
            </BorderBlock>
          }></ThreeColumnGrid>
      }
      rightContentSlot={
        <div style={{ display: 'flex', flexDirection: 'column', gap: '43px' }}>
          <ContentBlock title={rfidData.title} subtitle={rfidData.subtitle} items={rfidItems} />
          <svg
            width="1180"
            height="3"
            viewBox="0 0 1180 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="1180" height="3" rx="1.5" fill="#DBDBDB" />
          </svg>

          <ContentBlock
            title={rfidRetailData.title}
            subtitle={rfidRetailData.subtitle}
            items={rfidRetailItems}
          />
        </div>
      }
      rightImageSlot={<img className="mt-auto" src="/robot-3.png" alt="Moscow" />}></GridLayout>
  );
};

export default ClothesPage;
