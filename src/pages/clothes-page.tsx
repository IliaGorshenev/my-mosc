import { BorderBlock } from '@/components/border-block';
import { ClothingGrid } from '@/components/clothing-grid';
import { ContentBlock } from '@/components/content-block';
import { ThreeColumnGrid } from '@/components/footer-grid';
import { Header } from '@/components/header';
import { GridLayout } from '@/layouts/grid';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
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

type PotentialTheft = {
  id: string;
  name: string;
  timestamp: number;
  confirmationTime: number;
  confirmed: boolean;
};

const ClothesPage = () => {
  const [stolenItems, setStorenItems] = useAtom(stolenItemsAtom);
  const [currentItems, setCurrentItems] = useAtom(currentItemsAtom);
  const [lastFetchedItems, setLastFetchedItems] = useState<string[]>([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const potentialTheftsRef = useRef<PotentialTheft[]>([]);
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
          console.log(`Item: ${item.name}`);
          if (Array.isArray(item.sizes)) {
            // @ts-ignore
            item.sizes.forEach((sizeObj) => {
              console.log(`  Size: ${sizeObj.size}, Amount: ${sizeObj.amount}`);
              totalCount += sizeObj.amount || 0;
            });
          }
        });
        console.log('Final total count:', totalCount);
      }
      setTotalItemCount(totalCount);

      // Return the full data structure instead of just IDs
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error('Error fetching RFID items:', error);

      // Fallback to mock data in case of error
      return [
        { name: 'Футболка оверсайз Москва', sizes: [{ size: 'M', amount: 3 }] },
        { name: 'Бомбер на кнопках Москва', sizes: [{ size: 'S', amount: 2 }] },
        { name: 'Толстовка на молнии Москва', sizes: [{ size: 'L', amount: 1 }] },
        // Add more mock items as needed
      ];
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
    }, 3000); // Check every second

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (lastFetchedItems.length > 0) {
      // Check for potential stolen items by comparing previous and current state
      const newPotentialThefts: PotentialTheft[] = [];

      lastFetchedItems.forEach((prevItem) => {
        // Find the corresponding item in current items
        // @ts-ignore
        const currentItem = currentItems.find((item) => item.name === prevItem.name);

        if (!currentItem) {
          // The entire category is missing
          newPotentialThefts.push({
            id: Math.random().toString(36).substring(2, 9),
            // @ts-ignore
            name: prevItem.name,
            timestamp: Date.now(),
            confirmationTime: Date.now() + 4000, // 4 seconds from now
            confirmed: false,
          });
          return;
        }

        // Check if any size has decreased in quantity
        // @ts-ignore
        prevItem.sizes.forEach((prevSize) => {
          const currentSize = currentItem.sizes.find((size) => size.size === prevSize.size);

          if (!currentSize || currentSize.amount < prevSize.amount) {
            // This size has decreased in quantity or is missing
            const amountMissing = !currentSize
              ? prevSize.amount
              : prevSize.amount - currentSize.amount;
            console.log(
              // @ts-ignore
              `Detected potential theft: ${prevItem.name} (${prevSize.size}) - ${amountMissing} шт.`,
            );
            newPotentialThefts.push({
              id: Math.random().toString(36).substring(2, 9),
              // @ts-ignore
              name: `${prevItem.name} (${prevSize.size}) - ${amountMissing} шт.`,
              timestamp: Date.now(),
              confirmationTime: Date.now() + 4000, // 4 seconds from now
              confirmed: false,
            });
          }
        });
      });

      // Add new potential thefts to our tracking ref
      if (newPotentialThefts.length > 0) {
        potentialTheftsRef.current = [...potentialTheftsRef.current, ...newPotentialThefts];
      }
    }

    // Update last fetched items
    // @ts-ignore
    setLastFetchedItems(currentItems);
  }, [currentItems]);

  // Separate effect to check for confirmed thefts
  useEffect(() => {
    console.log('Checking for confirmed thefts...', stolenItems, currentItems);
    const checkTheftsInterval = setInterval(() => {
      const now = Date.now();
      const confirmedThefts: ClothingItem[] = [];

      // Check which potential thefts have passed their confirmation time
      potentialTheftsRef.current = potentialTheftsRef.current.filter((theft) => {
        // If it's time to confirm and it hasn't been confirmed yet
        if (now >= theft.confirmationTime && !theft.confirmed) {
          // Check if the item is still missing in the current data
          // @ts-ignore
          const itemName = theft.name.split(' (')[0]; // Extract base item name
          // @ts-ignore
          const currentItem = currentItems.find((item) => item.name === itemName);

          // If the item is still missing or has reduced quantity, confirm the theft
          if (!currentItem || isStillMissing(theft, currentItem)) {
            confirmedThefts.push({
              id: theft.id,
              name: theft.name,
              timestamp: now,
            });
            theft.confirmed = true;
            return false; // Remove from potential thefts
          }
        }

        // Keep tracking this potential theft if it's not yet time to confirm
        // or if it's been confirmed but we're still within the tracking window
        return now < theft.confirmationTime + 5000; // Keep for 10 more seconds after confirmation time
      });

      // Add confirmed thefts to the stolen items list
      if (confirmedThefts.length > 0) {
        console.log('Confirmed thefts:', confirmedThefts);
        setStorenItems((prev) => [...confirmedThefts, ...prev]);
      }
    }, 1000); // Check every second

    return () => clearInterval(checkTheftsInterval);
  }, [currentItems]);

  // Helper function to check if an item is still missing
  const isStillMissing = (theft: PotentialTheft, currentItem: any) => {
    // If the theft includes a size specification
    if (theft.name.includes('(')) {
      const sizePart = theft.name.split('(')[1].split(')')[0].trim();
      const size = sizePart.split(' -')[0].trim();

      // Check if this size is still missing or has reduced quantity
      const currentSize = currentItem.sizes.find((s: any) => s.size === size);
      return !currentSize || currentSize.amount < getOriginalAmount(theft);
    }

    // For whole item thefts, just check if the item exists
    return false;
  };

  // Helper to extract the original amount from the theft name
  const getOriginalAmount = (theft: PotentialTheft) => {
    if (theft.name.includes('шт.')) {
      const amountStr = theft.name.split('- ')[1].split(' шт.')[0];
      return parseInt(amountStr, 10);
    }
    return 0;
  };

  // Clean up old notifications after 10 seconds
  useEffect(() => {
    const cleanupInterval = setInterval(() => {
      const thirtySecondsAgo = Date.now() - 4 * 1000;
      setStorenItems((prev) => prev.filter((item) => item.timestamp > thirtySecondsAgo));
    }, 4000); // Check every 10 seconds

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
