# -*- coding: utf-8 -*- #
# Copyright 2023 Google LLC. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
"""Useful commands for interacting with the Cloud Firestore Databases API."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.firestore import api_utils


def _GetDatabaseService():
  """Returns the service for interacting with the Firestore admin service."""
  return api_utils.GetClient().projects_databases


def CreateDatabase(
    project, location, database, database_type, delete_protection_state
):
  """Performs a Firestore Admin v1 Database Creation.

  Args:
    project: the project id to create, a string.
    location: the database location to create, a string.
    database: the database id to create, a string.
    database_type: the database type, an Enum.
    delete_protection_state: the value for deleteProtectionState, an Enum.

  Returns:
    an Operation.
  """
  messages = api_utils.GetMessages()
  return _GetDatabaseService().Create(
      messages.FirestoreProjectsDatabasesCreateRequest(
          parent='projects/{}'.format(project),
          databaseId=database,
          googleFirestoreAdminV1Database=messages.GoogleFirestoreAdminV1Database(
              type=database_type,
              locationId=location,
              deleteProtectionState=delete_protection_state,
          ),
      )
  )


def DeleteDatabase(project, database, etag, allow_missing):
  """Performs a Firestore Admin v1 Database Deletion.

  Args:
    project: the project of the database to delete, a string.
    database: the database id to delete, a string.
    etag: the current etag of the Database, a string.
    allow_missing: delete will success on non-existing database if true, a bool.

  Returns:
    an Operation.
  """
  messages = api_utils.GetMessages()
  return _GetDatabaseService().Delete(
      messages.FirestoreProjectsDatabasesDeleteRequest(
          name='projects/{}/databases/{}'.format(project, database),
          etag=etag,
          allowMissing=allow_missing,
      )
  )


def ListDatabases(project):
  """Lists all Firestore databases under the project.

  Args:
    project: the project ID to list databases, a string.

  Returns:
    a List of Databases.
  """
  messages = api_utils.GetMessages()
  return _GetDatabaseService().List(
      messages.FirestoreProjectsDatabasesListRequest(
          parent='projects/{}'.format(project)
      )
  )
