interface TableHeadList {
  HeadList: string[];
}

export const TableHead: React.FC<TableHeadList> = ({ HeadList }) => {
  return (
    <thead>
      <tr className="bg-gray-2 text-left dark:bg-meta-4 border-y border-[#eee]">
        {HeadList.map((head, index) => (
          <th
            className={`px-4 py-4 font-medium text-nowrap text-white ${
              index === HeadList.length - 1 && "text-center"
            }`}
            key={index}
          >
            {head}
          </th>
        ))}
      </tr>
    </thead>
  );
};
