import React, {
  useEffect,
  useState,
} from 'react';
import {
  useParams,
  useNavigate,
} from 'react-router-dom';
import type { Service, ServiceSlug } from '../../types';
import { useSectionData } from '../../hooks';
import SectionMapper from '../../utils/sectionMapper';
import styles from './ServiceDetail.module.css';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: ServiceSlug }>();
  const navigate = useNavigate();
  const { getSection } = useSectionData();

  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      navigate('/');
      return;
    }

    try {
      const data = getSection(slug);

      if (!data) {
        setError('The service was not found')
        return;
      }

      setService(data);
    } catch (err) {
      setError("Data error loading");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [slug, navigate, getSection]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !service) {
    return (
      <div>
        <p>{error || 'Что-то пошло не так'}</p>
        <button onClick={() => navigate('/')}>On main page</button>
      </div>
    );
  }

  return (
    <div
      className={ styles[".service-detail-page"] }>
      <SectionMapper 
        schema={service.service_content_schema}
        data={service.data_service_content}
      />
    </div>
  )
};

export default ServiceDetail;