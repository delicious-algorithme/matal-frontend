import { useEffect, useState } from 'react';
import { getTopStores } from '../../../apis/api/getTopStores';
import MainContentsWrap from '../slider/MainContentsWrap';

const TopRecommendations = () => {
    const [topStores, setTopStores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchTopStores = async () => {
        setIsLoading(true);
        try {
            const response = await getTopStores();
            if (response.status === 200) {
                const data = response.data.content;
                setTopStores(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchTopStores();
    }, []);

    return (
        !isLoading && (
            <MainContentsWrap
                ranking={true}
                title="맛 알고리즘이 엄선한 TOP 10"
                description="맛알고리즘에서 긍정키워드로 분석한 맛집 컬렉션 10"
                stores={topStores}
            />
        )
    );
};

export default TopRecommendations;
