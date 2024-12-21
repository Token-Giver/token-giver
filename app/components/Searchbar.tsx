import Icon from "./icons/icon";

export default function Searchbar() {
  return (
    <div className="flex items-center gap-2 bg-tkg-gray-100 rounded-full px-2.5">
      <Icon name="lens" />
      <input
        type="text"
        className="flex w-full bg-transparent py-3 text-black placeholder:text-black"
        placeholder="search"
      />
    </div>
  );
}
