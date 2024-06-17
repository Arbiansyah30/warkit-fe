import { Link } from "react-router-dom";
import DataProduct from "../components/dashboard/DataProduct";

const Dashboard = () => {
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-2xl text-white">Tables</h2>

        <nav>
          <ol className="flex text-base items-center gap-2">
            <li>
              <Link
                className="font-medium text-secondary"
                to="/admin/dashboard"
              >
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-blue-500">Tables</li>
          </ol>
        </nav>
      </div>
      <DataProduct />
    </>
  );
};

export default Dashboard;
