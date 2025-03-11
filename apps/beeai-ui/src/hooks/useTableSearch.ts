/**
 * Copyright 2025 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { ChangeEvent, useCallback, useMemo, useState } from 'react';

interface Props<T> {
  entries: T[];
  fields: (keyof T)[];
}

export function useTableSearch<T>({ entries, fields }: Props<T>) {
  const [search, setSearch] = useState('');

  const onSearch = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  }, []);

  const items = useMemo(() => {
    const searchQuery = search.trim().toLowerCase();

    if (!searchQuery) {
      return entries;
    }

    return entries.filter((item) => fields.some((field) => String(item[field]).toLowerCase().includes(searchQuery)));
  }, [search, entries, fields]);

  return {
    items,
    onSearch,
  };
}
