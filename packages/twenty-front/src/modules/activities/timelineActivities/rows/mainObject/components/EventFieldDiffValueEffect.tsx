import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { FieldMetadataItem } from '@/object-metadata/types/FieldMetadataItem';
import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { recordStoreFamilyState } from '@/object-record/record-store/states/recordStoreFamilyState';

export const EventFieldDiffValueEffect = ({
  forgedRecordId,
  diffRecord,
  mainObjectMetadataItem,
  fieldMetadataItem,
}: {
  forgedRecordId: string;
  diffRecord: Record<string, any> | undefined;
  mainObjectMetadataItem: ObjectMetadataItem;
  fieldMetadataItem: FieldMetadataItem;
}) => {
  const setEntityFields = useSetRecoilState(
    recordStoreFamilyState(forgedRecordId),
  );

  useEffect(() => {
    if (!diffRecord) return;

    const forgedObjectRecord = {
      __typename: mainObjectMetadataItem.nameSingular,
      id: forgedRecordId,
      [fieldMetadataItem.name]: diffRecord,
    };

    setEntityFields(forgedObjectRecord);
  }, [
    diffRecord,
    forgedRecordId,
    fieldMetadataItem.name,
    mainObjectMetadataItem.nameSingular,
    setEntityFields,
  ]);

  return <></>;
};
