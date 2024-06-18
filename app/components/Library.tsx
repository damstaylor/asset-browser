// Main Library component
"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Item from "./Item";
import ItemModal from "./ItemModal";
import Modal from "./Modal";
import RequestForm from "./RequestForm";
import SearchBar from "./SearchBar";
import Section from "./Section";
import Tabs from "./Tabs";

const TABS = [
  { label: "Dataviz", value: "Dataviz" },
  { label: "KPI", value: "KPI" },
  { label: "Layouts", value: "Layout" },
  { label: "Storyboards", value: "Storyboard" },
];

const Library: React.FC = () => {
  const [selectedTabValue, setSelectedTabValue] =
    useState<AssetType>("Dataviz");
  const [assets, setAssets] = useState<Asset[]>([]);
  const [openedAssetId, setOpenedAssetId] = useState<number | null>(null);
  const [requestModalOpened, setRequestModalOpened] = useState(false);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initial data fetching from assets.json file
  const fetchAssets = useCallback(async () => {
    try {
      const response = await fetch("/assets.json");
      const data: Asset[] = await response.json();
      setAssets(data);
    } catch (err) {
      setError("Error while fetching assets");
      console.error("Error while fetching assets:", err);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Callback when changing tab
  const handleTabChange = useCallback(
    (label: string) => setSelectedTabValue(label as AssetType),
    [],
  );

  // Callback when closing request modal
  const handleCloseRequestModal = useCallback(() => {
    setRequestModalOpened(false);
    setDisplayConfirmation(false);
  }, []);

  // Calback for simulating favorite status change for opened asset (could be via an API)
  const toggleFavorite = useCallback((id: number) => {
    setAssets((prevAssets) => {
      const assetIdx = prevAssets.findIndex((asset) => id === asset.id);
      if (assetIdx === -1) {
        throw new Error(`Asset with id ${id} not found.`);
      }
      const asset = prevAssets[assetIdx];
      const updatedAsset = {
        ...asset,
        isFavorite: !asset.isFavorite,
      };
      const updatedAssets = [...prevAssets];
      updatedAssets.splice(assetIdx, 1, updatedAsset);
      return updatedAssets;
    });
  }, []);

  // Sort assets to show favorite ones first
  const sortedAssets = useMemo(
    () =>
      [...assets].sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite)),
    [assets],
  );

  // Filter according to search term value
  const searchTermLow = searchTerm.toLowerCase();
  const filteredAssets = useMemo(
    () =>
      searchTerm
        ? sortedAssets.filter((asset) =>
            asset.name.toLowerCase().includes(searchTermLow),
          )
        : sortedAssets,
    [sortedAssets, searchTerm, searchTermLow],
  );
  const filteredAssetsForSelectedTab = useMemo(
    () =>
      filteredAssets.filter((asset) => asset.assetType === selectedTabValue),
    [filteredAssets, selectedTabValue],
  );
  const featuredAssets = useMemo(
    () =>
      filteredAssetsForSelectedTab.filter(
        (asset) => !!asset.category && asset.category === "Featured",
      ),
    [filteredAssetsForSelectedTab],
  );
  // Isolate trending and featured assets for current tab
  const featuredAssetsIds = useMemo(
    () => featuredAssets.map((asset) => asset.id),
    [featuredAssets],
  );
  const trendingAssets = useMemo(
    () =>
      filteredAssetsForSelectedTab.filter(
        (asset) => !featuredAssetsIds.includes(asset.id),
      ),
    [filteredAssetsForSelectedTab, featuredAssetsIds],
  );
  const openedAsset = openedAssetId
    ? sortedAssets.find((asset) => asset.id === openedAssetId)
    : null;
  // Loading message
  if (loading) {
    return <p className="text-center w-full">Loading...</p>;
  }
  // Error message
  if (error) {
    return <p className="text-center w-full">{error}</p>;
  }
  return (
    <div className="justify-center w-full">
      <h1 className="text-4l text-center">Library</h1>
      <p className="text-center">
        Browse for assets needed to report and present analysis.
      </p>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Tabs
        tabs={TABS}
        selectedTabValue={selectedTabValue}
        onTabChange={handleTabChange}
      />
      {!!featuredAssets.length && (
        <Section
          title="Featured"
          subtitle={"Curated top picks from this week"}
          key="section-featured"
        >
          <div className="grid grid-cols-2 gap-4">
            {featuredAssets.map((asset: Asset) => (
              <Item
                item={asset}
                handleItemClick={() => setOpenedAssetId(asset.id)}
                key={`feat-asset-${asset.id}`}
              />
            ))}
          </div>
        </Section>
      )}
      {!!trendingAssets.length && (
        <Section
          title="Trending"
          subtitle={"Most popular by community"}
          key="section-trending"
        >
          <div className="grid grid-cols-2 gap-4">
            {trendingAssets.map((asset: Asset) => (
              <Item
                item={asset}
                handleItemClick={() => setOpenedAssetId(asset.id)}
                key={`trend-asset-${asset.id}`}
              />
            ))}
          </div>
        </Section>
      )}
      {!filteredAssetsForSelectedTab.length && (
        <p className="text-center mt-8">No results :(</p>
      )}
      <button
        type="button"
        className="absolute top-0 right-0 flex items-center gap-2 px-4 m-4"
        onClick={() => setRequestModalOpened(true)}
      >
        <Image src="/box-plus.svg" alt="Request" width={16} height={16} />
        Request
      </button>
      <Modal
        open={requestModalOpened}
        onClose={handleCloseRequestModal}
        title="Access request form"
      >
        <RequestForm
          onSubmit={() => setDisplayConfirmation(true)}
          submitted={displayConfirmation}
        />
        {displayConfirmation && (
          <p className="mt-4">
            Your access request was submitted! You can close this modal.
          </p>
        )}
      </Modal>
      {!!openedAsset && (
        <ItemModal
          item={openedAsset}
          open={!!openedAsset}
          handleModalAction={() =>
            openedAssetId ? toggleFavorite(openedAssetId) : undefined
          }
          onClose={() => setOpenedAssetId(null)}
        />
      )}
    </div>
  );
};

export default Library;
