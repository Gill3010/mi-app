"""Generated message classes for workloadcertificate version v1alpha1.

workloadcertificate.googleapis.com API.
"""
# NOTE: This file is autogenerated and should not be edited by hand.

from __future__ import absolute_import

from apitools.base.protorpclite import messages as _messages
from apitools.base.py import encoding
from apitools.base.py import extra_types


package = 'workloadcertificate'


class CaPoolsStatus(_messages.Message):
  r"""Status of CA pools in a region.

  Fields:
    caPools: The CA pool string has a relative resource path following the
      form "projects/{project number}/locations/{location}/caPools/{CA pool}".
  """

  caPools = _messages.StringField(1, repeated=True)


class CancelOperationRequest(_messages.Message):
  r"""The request message for Operations.CancelOperation."""


class Empty(_messages.Message):
  r"""A generic empty message that you can re-use to avoid defining duplicated
  empty messages in your APIs. A typical example is to use it as the request
  or the response type of an API method. For instance: service Foo { rpc
  Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
  """



class K8SWorkloadSelector(_messages.Message):
  r"""For Kubernetes workloads, fleet_member_id is used as workload selector.

  Fields:
    fleetMemberId: Required. Fleet membership ID (only the name part, not the
      full URI). The project and location of the membership are the same as
      the WorkloadRegistration.
  """

  fleetMemberId = _messages.StringField(1)


class ListLocationsResponse(_messages.Message):
  r"""The response message for Locations.ListLocations.

  Fields:
    locations: A list of locations that matches the specified filter in the
      request.
    nextPageToken: The standard List next-page token.
  """

  locations = _messages.MessageField('Location', 1, repeated=True)
  nextPageToken = _messages.StringField(2)


class ListOperationsResponse(_messages.Message):
  r"""The response message for Operations.ListOperations.

  Fields:
    nextPageToken: The standard List next-page token.
    operations: A list of operations that matches the specified filter in the
      request.
  """

  nextPageToken = _messages.StringField(1)
  operations = _messages.MessageField('Operation', 2, repeated=True)


class ListWorkloadRegistrationsResponse(_messages.Message):
  r"""Response message for listing WorkloadRegistrations.

  Fields:
    nextPageToken: A token identifying a page of results the server should
      return for the next List request. Empty if this response is the last
      page.
    unreachable: Locations that could not be reached.
    workloadRegistrations: The list of WorkloadRegistrations.
  """

  nextPageToken = _messages.StringField(1)
  unreachable = _messages.StringField(2, repeated=True)
  workloadRegistrations = _messages.MessageField('WorkloadRegistration', 3, repeated=True)


class Location(_messages.Message):
  r"""A resource that represents Google Cloud Platform location.

  Messages:
    LabelsValue: Cross-service attributes for the location. For example
      {"cloud.googleapis.com/region": "us-east1"}
    MetadataValue: Service-specific metadata. For example the available
      capacity at the given location.

  Fields:
    displayName: The friendly name for this location, typically a nearby city
      name. For example, "Tokyo".
    labels: Cross-service attributes for the location. For example
      {"cloud.googleapis.com/region": "us-east1"}
    locationId: The canonical id for this location. For example: `"us-east1"`.
    metadata: Service-specific metadata. For example the available capacity at
      the given location.
    name: Resource name for the location, which may vary between
      implementations. For example: `"projects/example-project/locations/us-
      east1"`
  """

  @encoding.MapUnrecognizedFields('additionalProperties')
  class LabelsValue(_messages.Message):
    r"""Cross-service attributes for the location. For example
    {"cloud.googleapis.com/region": "us-east1"}

    Messages:
      AdditionalProperty: An additional property for a LabelsValue object.

    Fields:
      additionalProperties: Additional properties of type LabelsValue
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a LabelsValue object.

      Fields:
        key: Name of the additional property.
        value: A string attribute.
      """

      key = _messages.StringField(1)
      value = _messages.StringField(2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  @encoding.MapUnrecognizedFields('additionalProperties')
  class MetadataValue(_messages.Message):
    r"""Service-specific metadata. For example the available capacity at the
    given location.

    Messages:
      AdditionalProperty: An additional property for a MetadataValue object.

    Fields:
      additionalProperties: Properties of the object. Contains field @type
        with type URL.
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a MetadataValue object.

      Fields:
        key: Name of the additional property.
        value: A extra_types.JsonValue attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('extra_types.JsonValue', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  displayName = _messages.StringField(1)
  labels = _messages.MessageField('LabelsValue', 2)
  locationId = _messages.StringField(3)
  metadata = _messages.MessageField('MetadataValue', 4)
  name = _messages.StringField(5)


class Operation(_messages.Message):
  r"""This resource represents a long-running operation that is the result of
  a network API call.

  Messages:
    MetadataValue: Service-specific metadata associated with the operation. It
      typically contains progress information and common metadata such as
      create time. Some services might not provide such metadata. Any method
      that returns a long-running operation should document the metadata type,
      if any.
    ResponseValue: The normal response of the operation in case of success. If
      the original method returns no data on success, such as `Delete`, the
      response is `google.protobuf.Empty`. If the original method is standard
      `Get`/`Create`/`Update`, the response should be the resource. For other
      methods, the response should have the type `XxxResponse`, where `Xxx` is
      the original method name. For example, if the original method name is
      `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.

  Fields:
    done: If the value is `false`, it means the operation is still in
      progress. If `true`, the operation is completed, and either `error` or
      `response` is available.
    error: The error result of the operation in case of failure or
      cancellation.
    metadata: Service-specific metadata associated with the operation. It
      typically contains progress information and common metadata such as
      create time. Some services might not provide such metadata. Any method
      that returns a long-running operation should document the metadata type,
      if any.
    name: The server-assigned name, which is only unique within the same
      service that originally returns it. If you use the default HTTP mapping,
      the `name` should be a resource name ending with
      `operations/{unique_id}`.
    response: The normal response of the operation in case of success. If the
      original method returns no data on success, such as `Delete`, the
      response is `google.protobuf.Empty`. If the original method is standard
      `Get`/`Create`/`Update`, the response should be the resource. For other
      methods, the response should have the type `XxxResponse`, where `Xxx` is
      the original method name. For example, if the original method name is
      `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.
  """

  @encoding.MapUnrecognizedFields('additionalProperties')
  class MetadataValue(_messages.Message):
    r"""Service-specific metadata associated with the operation. It typically
    contains progress information and common metadata such as create time.
    Some services might not provide such metadata. Any method that returns a
    long-running operation should document the metadata type, if any.

    Messages:
      AdditionalProperty: An additional property for a MetadataValue object.

    Fields:
      additionalProperties: Properties of the object. Contains field @type
        with type URL.
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a MetadataValue object.

      Fields:
        key: Name of the additional property.
        value: A extra_types.JsonValue attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('extra_types.JsonValue', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  @encoding.MapUnrecognizedFields('additionalProperties')
  class ResponseValue(_messages.Message):
    r"""The normal response of the operation in case of success. If the
    original method returns no data on success, such as `Delete`, the response
    is `google.protobuf.Empty`. If the original method is standard
    `Get`/`Create`/`Update`, the response should be the resource. For other
    methods, the response should have the type `XxxResponse`, where `Xxx` is
    the original method name. For example, if the original method name is
    `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`.

    Messages:
      AdditionalProperty: An additional property for a ResponseValue object.

    Fields:
      additionalProperties: Properties of the object. Contains field @type
        with type URL.
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a ResponseValue object.

      Fields:
        key: Name of the additional property.
        value: A extra_types.JsonValue attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('extra_types.JsonValue', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  done = _messages.BooleanField(1)
  error = _messages.MessageField('Status', 2)
  metadata = _messages.MessageField('MetadataValue', 3)
  name = _messages.StringField(4)
  response = _messages.MessageField('ResponseValue', 5)


class OperationMetadata(_messages.Message):
  r"""Represents the metadata of the long-running operation.

  Fields:
    apiVersion: Output only. API version used to start the operation.
    createTime: Output only. The time the operation was created.
    endTime: Output only. The time the operation finished running.
    requestedCancellation: Output only. Identifies whether the user has
      requested cancellation of the operation. Currently we don't support
      cancelling any operation. Consider applying the opposite mutation after
      the current operation is done. For example, call
      DeleteWorkloadRegistration afterwards if you want to cancel a
      CreateWorkloadRegistration operation.
    statusMessage: Output only. Human-readable status of the operation, if
      any.
    target: Output only. Server-defined resource path for the target of the
      operation.
    verb: Output only. Name of the verb executed by the operation.
  """

  apiVersion = _messages.StringField(1)
  createTime = _messages.StringField(2)
  endTime = _messages.StringField(3)
  requestedCancellation = _messages.BooleanField(4)
  statusMessage = _messages.StringField(5)
  target = _messages.StringField(6)
  verb = _messages.StringField(7)


class RegistrationStatus(_messages.Message):
  r"""RegistrationStatus describes the certificate provisioning status of a
  WorkloadRegistration resource.

  Enums:
    StateValueValuesEnum: The current state of registration.

  Fields:
    state: The current state of registration.
  """

  class StateValueValuesEnum(_messages.Enum):
    r"""The current state of registration.

    Values:
      REGISTRATION_STATE_UNSPECIFIED: REGISTRATION_STATE_UNSPECIFIED is the
        default value.
      REGISTRATION_STATE_READY: REGISTRATION_STATE_READY indicates that the
        registration is ready.
      REGISTRATION_STATE_IN_PROGRESS: REGISTRATION_STATE_IN_PROGRESS indicates
        that the registration is in progress.
      REGISTRATION_STATE_INTERNAL_ERROR: REGISTRATION_STATE_INTERNAL_ERROR
        indicates that the registration has encountered some internal errors
        but is retrying. Contact support if this persists.
    """
    REGISTRATION_STATE_UNSPECIFIED = 0
    REGISTRATION_STATE_READY = 1
    REGISTRATION_STATE_IN_PROGRESS = 2
    REGISTRATION_STATE_INTERNAL_ERROR = 3

  state = _messages.EnumField('StateValueValuesEnum', 1)


class StandardQueryParameters(_messages.Message):
  r"""Query parameters accepted by all methods.

  Enums:
    FXgafvValueValuesEnum: V1 error format.
    AltValueValuesEnum: Data format for response.

  Fields:
    f__xgafv: V1 error format.
    access_token: OAuth access token.
    alt: Data format for response.
    callback: JSONP
    fields: Selector specifying which fields to include in a partial response.
    key: API key. Your API key identifies your project and provides you with
      API access, quota, and reports. Required unless you provide an OAuth 2.0
      token.
    oauth_token: OAuth 2.0 token for the current user.
    prettyPrint: Returns response with indentations and line breaks.
    quotaUser: Available to use for quota purposes for server-side
      applications. Can be any arbitrary string assigned to a user, but should
      not exceed 40 characters.
    trace: A tracing token of the form "token:<tokenid>" to include in api
      requests.
    uploadType: Legacy upload protocol for media (e.g. "media", "multipart").
    upload_protocol: Upload protocol for media (e.g. "raw", "multipart").
  """

  class AltValueValuesEnum(_messages.Enum):
    r"""Data format for response.

    Values:
      json: Responses with Content-Type of application/json
      media: Media download with context-dependent Content-Type
      proto: Responses with Content-Type of application/x-protobuf
    """
    json = 0
    media = 1
    proto = 2

  class FXgafvValueValuesEnum(_messages.Enum):
    r"""V1 error format.

    Values:
      _1: v1 error format
      _2: v2 error format
    """
    _1 = 0
    _2 = 1

  f__xgafv = _messages.EnumField('FXgafvValueValuesEnum', 1)
  access_token = _messages.StringField(2)
  alt = _messages.EnumField('AltValueValuesEnum', 3, default='json')
  callback = _messages.StringField(4)
  fields = _messages.StringField(5)
  key = _messages.StringField(6)
  oauth_token = _messages.StringField(7)
  prettyPrint = _messages.BooleanField(8, default=True)
  quotaUser = _messages.StringField(9)
  trace = _messages.StringField(10)
  uploadType = _messages.StringField(11)
  upload_protocol = _messages.StringField(12)


class Status(_messages.Message):
  r"""The `Status` type defines a logical error model that is suitable for
  different programming environments, including REST APIs and RPC APIs. It is
  used by [gRPC](https://github.com/grpc). Each `Status` message contains
  three pieces of data: error code, error message, and error details. You can
  find out more about this error model and how to work with it in the [API
  Design Guide](https://cloud.google.com/apis/design/errors).

  Messages:
    DetailsValueListEntry: A DetailsValueListEntry object.

  Fields:
    code: The status code, which should be an enum value of google.rpc.Code.
    details: A list of messages that carry the error details. There is a
      common set of message types for APIs to use.
    message: A developer-facing error message, which should be in English. Any
      user-facing error message should be localized and sent in the
      google.rpc.Status.details field, or localized by the client.
  """

  @encoding.MapUnrecognizedFields('additionalProperties')
  class DetailsValueListEntry(_messages.Message):
    r"""A DetailsValueListEntry object.

    Messages:
      AdditionalProperty: An additional property for a DetailsValueListEntry
        object.

    Fields:
      additionalProperties: Properties of the object. Contains field @type
        with type URL.
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a DetailsValueListEntry object.

      Fields:
        key: Name of the additional property.
        value: A extra_types.JsonValue attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('extra_types.JsonValue', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  code = _messages.IntegerField(1, variant=_messages.Variant.INT32)
  details = _messages.MessageField('DetailsValueListEntry', 2, repeated=True)
  message = _messages.StringField(3)


class WorkloadCertificateFeature(_messages.Message):
  r"""Represents the Managed Workload Certificate feature. This is a singleton
  resource of a project that contains the mode of the feature, trust-domain-
  level configurations, and etc.

  Fields:
    defaultSpec: Required. Workload certificate feature spec for the default
      project level trust domain (i.e. `{project ID}.svc.id.goog`).
    defaultStatus: Output only. The current WorkloadCertificate feature status
      of the default project level trust domain.
    name: Output only. Name of the resource. Format: `projects/{project ID or
      number}/locations/global/workloadCertificateFeature`.
  """

  defaultSpec = _messages.MessageField('WorkloadCertificateFeatureSpec', 1)
  defaultStatus = _messages.MessageField('WorkloadCertificateFeatureStatus', 2)
  name = _messages.StringField(3)


class WorkloadCertificateFeatureSpec(_messages.Message):
  r"""Spec for the workload certificate feature.

  Enums:
    ModeValueValuesEnum: Required. The mode for the workload certificate
      feature.

  Fields:
    mode: Required. The mode for the workload certificate feature.
  """

  class ModeValueValuesEnum(_messages.Enum):
    r"""Required. The mode for the workload certificate feature.

    Values:
      MODE_UNSPECIFIED: Do not use this value.
      MODE_DISABLED: Workload certificate feature is disabled.
      MODE_ENABLED_WITH_MANAGED_CA: Workload certificate feature is enabled,
        and the entire certificate provisioning process is managed by Google,
        including the CA.
    """
    MODE_UNSPECIFIED = 0
    MODE_DISABLED = 1
    MODE_ENABLED_WITH_MANAGED_CA = 2

  mode = _messages.EnumField('ModeValueValuesEnum', 1)


class WorkloadCertificateFeatureStatus(_messages.Message):
  r"""Status of Workload Certificate feature at trust domain level.

  Enums:
    StateValueValuesEnum: Describes whether the Workload Certificate feature
      meets its spec.

  Messages:
    ManagedCaPoolsValue: A map from a region to the status of managed CA pools
      in that region.

  Fields:
    managedCaPools: A map from a region to the status of managed CA pools in
      that region.
    state: Describes whether the Workload Certificate feature meets its spec.
  """

  class StateValueValuesEnum(_messages.Enum):
    r"""Describes whether the Workload Certificate feature meets its spec.

    Values:
      FEATURE_STATE_UNSPECIFIED: The feature status does not fully meet its
        spec at the moment but is trying to meet its spec.
      FEATURE_STATE_IN_PROGRESS: The feature status does not fully meet its
        spec at the moment but is trying to meet its spec.
      FEATURE_STATE_READY: The feature status currently meets its spec.
      FEATURE_STATE_INTERNAL_ERROR: The feature status does not fully meet its
        spec at the moment due to an internal error but the backend is
        retrying. Contact support if this persists.
    """
    FEATURE_STATE_UNSPECIFIED = 0
    FEATURE_STATE_IN_PROGRESS = 1
    FEATURE_STATE_READY = 2
    FEATURE_STATE_INTERNAL_ERROR = 3

  @encoding.MapUnrecognizedFields('additionalProperties')
  class ManagedCaPoolsValue(_messages.Message):
    r"""A map from a region to the status of managed CA pools in that region.

    Messages:
      AdditionalProperty: An additional property for a ManagedCaPoolsValue
        object.

    Fields:
      additionalProperties: Additional properties of type ManagedCaPoolsValue
    """

    class AdditionalProperty(_messages.Message):
      r"""An additional property for a ManagedCaPoolsValue object.

      Fields:
        key: Name of the additional property.
        value: A CaPoolsStatus attribute.
      """

      key = _messages.StringField(1)
      value = _messages.MessageField('CaPoolsStatus', 2)

    additionalProperties = _messages.MessageField('AdditionalProperty', 1, repeated=True)

  managedCaPools = _messages.MessageField('ManagedCaPoolsValue', 1)
  state = _messages.EnumField('StateValueValuesEnum', 2)


class WorkloadRegistration(_messages.Message):
  r"""Message describing WorkloadRegistration object

  Fields:
    createTime: Output only. Time when this WorkloadRegistration resource was
      created.
    name: Output only. Name of this WorkloadRegistration resource. Format:
      `projects/{project ID or number}/locations/{location}
      /workloadRegistrations/{client-defined workload_registration_id}`
      {location} is Fleet membership location for GKE clusters and this is
      subject to change.
    status: Output only. The status of the WorkloadRegistration resource.
    updateTime: Output only. Time when this WorkloadRegistration resource was
      most recently updated.
    workloadSelector: Required. Selects the workloads in the registration.
  """

  createTime = _messages.StringField(1)
  name = _messages.StringField(2)
  status = _messages.MessageField('RegistrationStatus', 3)
  updateTime = _messages.StringField(4)
  workloadSelector = _messages.MessageField('WorkloadSelector', 5)


class WorkloadSelector(_messages.Message):
  r"""WorkloadSelector specifies the criteria used to determine if a workload
  is in a WorkloadRegistration. Different workload types have their own
  matching criteria.

  Fields:
    k8sWorkloadSelector: Selects K8S workloads.
  """

  k8sWorkloadSelector = _messages.MessageField('K8SWorkloadSelector', 1)


class WorkloadcertificateProjectsLocationsGetRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsGetRequest object.

  Fields:
    name: Resource name for the location.
  """

  name = _messages.StringField(1, required=True)


class WorkloadcertificateProjectsLocationsGlobalGetWorkloadCertificateFeatureRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsGlobalGetWorkloadCertificateFeatur
  eRequest object.

  Fields:
    name: Required. Name of the `WorkloadCertificateFeature` resource. Format:
      `projects/{project ID or
      number}/locations/global/workloadCertificateFeature`.
  """

  name = _messages.StringField(1, required=True)


class WorkloadcertificateProjectsLocationsListRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsListRequest object.

  Fields:
    filter: A filter to narrow down results to a preferred subset. The
      filtering language accepts strings like `"displayName=tokyo"`, and is
      documented in more detail in [AIP-160](https://google.aip.dev/160).
    name: The resource that owns the locations collection, if applicable.
    pageSize: The maximum number of results to return. If not set, the service
      selects a default.
    pageToken: A page token received from the `next_page_token` field in the
      response. Send that page token to receive the subsequent page.
  """

  filter = _messages.StringField(1)
  name = _messages.StringField(2, required=True)
  pageSize = _messages.IntegerField(3, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(4)


class WorkloadcertificateProjectsLocationsOperationsCancelRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsOperationsCancelRequest object.

  Fields:
    cancelOperationRequest: A CancelOperationRequest resource to be passed as
      the request body.
    name: The name of the operation resource to be cancelled.
  """

  cancelOperationRequest = _messages.MessageField('CancelOperationRequest', 1)
  name = _messages.StringField(2, required=True)


class WorkloadcertificateProjectsLocationsOperationsDeleteRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsOperationsDeleteRequest object.

  Fields:
    name: The name of the operation resource to be deleted.
  """

  name = _messages.StringField(1, required=True)


class WorkloadcertificateProjectsLocationsOperationsGetRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsOperationsGetRequest object.

  Fields:
    name: The name of the operation resource.
  """

  name = _messages.StringField(1, required=True)


class WorkloadcertificateProjectsLocationsOperationsListRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsOperationsListRequest object.

  Fields:
    filter: The standard list filter.
    name: The name of the operation's parent resource.
    pageSize: The standard list page size.
    pageToken: The standard list page token.
  """

  filter = _messages.StringField(1)
  name = _messages.StringField(2, required=True)
  pageSize = _messages.IntegerField(3, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(4)


class WorkloadcertificateProjectsLocationsWorkloadRegistrationsCreateRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsWorkloadRegistrationsCreateRequest
  object.

  Fields:
    parent: Required. Value for parent. Format: `projects/{project ID or
      number}/locations/{location}`
    requestId: Optional. An optional request ID to identify requests. Specify
      a unique request ID so that if you must retry your request, the server
      will know to ignore the request if it has already been completed. The
      server will guarantee that for at least 60 minutes since the first
      request. For example, consider a situation where you make an initial
      request and t he request times out. If you make the request again with
      the same request ID, the server can check if original operation with the
      same request ID was received, and if so, will ignore the second request.
      This prevents clients from accidentally creating duplicate commitments.
      The request ID must be a valid UUID with the exception that zero UUID is
      not supported (00000000-0000-0000-0000-000000000000).
    workloadRegistration: A WorkloadRegistration resource to be passed as the
      request body.
    workloadRegistrationId: Required. Client defined WorkloadRegistration
      name. This can be any unique string that matches the regex
      ^[a-zA-Z0-9-._~%!$&'()*+,;=@]+$ and has 1-63 characters in length.
  """

  parent = _messages.StringField(1, required=True)
  requestId = _messages.StringField(2)
  workloadRegistration = _messages.MessageField('WorkloadRegistration', 3)
  workloadRegistrationId = _messages.StringField(4)


class WorkloadcertificateProjectsLocationsWorkloadRegistrationsDeleteRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsWorkloadRegistrationsDeleteRequest
  object.

  Fields:
    name: Required. Name of the resource. Format: `projects/{project ID or num
      ber}/locations/{location}/workloadRegistrations/{workload_registration_i
      d}`
    requestId: Optional. An optional request ID to identify requests. Specify
      a unique request ID so that if you must retry your request, the server
      will know to ignore the request if it has already been completed. The
      server will guarantee that for at least 60 minutes after the first
      request. For example, consider a situation where you make an initial
      request and t he request times out. If you make the request again with
      the same request ID, the server can check if original operation with the
      same request ID was received, and if so, will ignore the second request.
      This prevents clients from accidentally creating duplicate commitments.
      The request ID must be a valid UUID with the exception that zero UUID is
      not supported (00000000-0000-0000-0000-000000000000).
  """

  name = _messages.StringField(1, required=True)
  requestId = _messages.StringField(2)


class WorkloadcertificateProjectsLocationsWorkloadRegistrationsGetRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsWorkloadRegistrationsGetRequest
  object.

  Fields:
    name: Required. Name of the resource. Format: `projects/{project ID or num
      ber}/locations/{location}/workloadRegistrations/{workload_registration_i
      d}`
  """

  name = _messages.StringField(1, required=True)


class WorkloadcertificateProjectsLocationsWorkloadRegistrationsListRequest(_messages.Message):
  r"""A WorkloadcertificateProjectsLocationsWorkloadRegistrationsListRequest
  object.

  Fields:
    filter: Filtering results. See https://google.aip.dev/160.
    orderBy: Hint for how to order the results. See
      https://google.aip.dev/132#ordering. Currently, only ordering by name
      and create_time are supported.
    pageSize: Requested page size. Server may return fewer items than
      requested. If unspecified, server will pick an appropriate default.
    pageToken: The next_page_token value returned from a previous List
      request, if any.
    parent: Required. Parent value for ListWorkloadRegistrationsRequest.
      Format: `projects/{project ID or number}/locations/{location}`
  """

  filter = _messages.StringField(1)
  orderBy = _messages.StringField(2)
  pageSize = _messages.IntegerField(3, variant=_messages.Variant.INT32)
  pageToken = _messages.StringField(4)
  parent = _messages.StringField(5, required=True)


encoding.AddCustomJsonFieldMapping(
    StandardQueryParameters, 'f__xgafv', '$.xgafv')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_1', '1')
encoding.AddCustomJsonEnumMapping(
    StandardQueryParameters.FXgafvValueValuesEnum, '_2', '2')