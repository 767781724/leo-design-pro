import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import style from './index.module.scss';

type IPathItemProps = {
  path?: string;
  name: string;
};

interface IFBreadcrumbProps {
  breadcrumbs?: IPathItemProps[];
}
const PREFIX = 'f-breadcrumb';
const FBreadcrumb = ({ breadcrumbs }: IFBreadcrumbProps) => {
  const location = useLocation();
  return (
    <div className={style[PREFIX]}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to={'/'}>首页</Link>
        </Breadcrumb.Item>
        {breadcrumbs?.map((e, index) => (
          <Breadcrumb.Item key={index}>
            {e.path ? (
              e.path === location.pathname ? (
                <Link to={location.pathname + location.search}>{e.name}</Link>
              ) : (
                <Link to={e.path}>{e.name}</Link>
              )
            ) : (
              e.name
            )}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </div>
  );
};

export default FBreadcrumb;
