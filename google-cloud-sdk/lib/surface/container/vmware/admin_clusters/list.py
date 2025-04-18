# -*- coding: utf-8 -*- #
# Copyright 2022 Google LLC. All Rights Reserved.
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
"""Command to list all admin clusters in the Anthos clusters on VMware API."""

from __future__ import absolute_import
from __future__ import division
from __future__ import unicode_literals

from googlecloudsdk.api_lib.container.gkeonprem import vmware_admin_clusters as apis
from googlecloudsdk.calliope import base
from googlecloudsdk.command_lib.container.vmware import constants
from googlecloudsdk.command_lib.container.vmware import flags
from googlecloudsdk.core import log

_EXAMPLES = """
To list all admin clusters managed in location ``us-west1'', run:

$ {command} --location=us-west1
"""

_EPILOG = """
To include unenrolled admin clusters, run:

$ gcloud container fleet memberships list --filter='endpoint.onPremCluster.adminCluster=true'
"""


@base.ReleaseTracks(base.ReleaseTrack.ALPHA, base.ReleaseTrack.BETA)
class List(base.ListCommand):
  """List Anthos on VMware admin clusters."""

  detailed_help = {'EXAMPLES': _EXAMPLES}

  @staticmethod
  def Args(parser):
    """Gathers command line arguments for the list command.

    Args:
      parser: The argparse parser to add the flag to.
    """
    parser.display_info.AddFormat(constants.VMWARE_ADMIN_CLUSTERS_FORMAT)
    flags.AddLocationResourceArg(parser,
                                 'to list Anthos on VMware admin clusters')

  def Run(self, args):
    """Runs the list command.

    Args:
      args: Arguments received from command line.

    Returns:
      protorpc.message.Message, The resources listed by the service.
    """
    client = apis.AdminClustersClient()
    return client.List(args)

  def Epilog(self, resources_were_displayed):
    super(List, self).Epilog(resources_were_displayed)
    log.status.Print(_EPILOG)
